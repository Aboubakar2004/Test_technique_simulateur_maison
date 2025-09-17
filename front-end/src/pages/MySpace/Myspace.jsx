import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { simulationApi } from "../../api/client";
import "./Myspace.css";

const MySpace = () => {
  const { user } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await simulationApi.getHistory();

      if (response.ok) {
        setSimulations(response.data);
      } else {
        setError("Erreur lors du chargement des simulations");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cette simulation ?")
    ) {
      return;
    }

    try {
      setDeleting(id);
      const response = await simulationApi.delete(id);

      if (response.ok) {
        setSimulations(simulations.filter((sim) => sim.id !== id));
      } else {
        setError("Erreur lors de la suppression");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setDeleting(null);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div>
        <div>Chargement de vos simulations...</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Mon Espace</h1>
      </div>
      {error && <div>{error}</div>}
      {simulations.length === 0 ? (
        <div>
          <p>Aucune simulation sauvegardée</p>
          <a href="/simulation">Créer une simulation</a>
        </div>
      ) : (
        <div>
          {simulations.map((simulation, index) => (
            <div key={simulation.id} className="result-container">
              <h2 className="result-title">Simulation {index + 1}</h2>
              <p className="result-style">
                Capacité d'emprunt:
                <span className="result-value">
                  {formatCurrency(simulation.borrowing_capacity)}
                </span>
              </p>
              <p className="result-style">
                Taux d'endettement:
                <span className="result-value">{simulation.debt_ratio}%</span>
              </p>
              <p className="result-style">
                Coût total du projet:
                <span className="result-value">
                  {formatCurrency(simulation.total_project_cost)}
                </span>
              </p>
              <p className="result-style">
                Coût total du crédit:
                <span className="result-value">
                  {formatCurrency(simulation.total_credit_cost)}
                </span>
              </p>
              <p className="result-style">
                Mensualité estimée:
                <span className="result-value">
                  {formatCurrency(simulation.estimated_monthly_payment)}
                </span>
              </p>
              <button
                onClick={() => handleDelete(simulation.id)}
                disabled={deleting === simulation.id}
                className="simulation-delete-button"
              >
                {deleting === simulation.id ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySpace;
