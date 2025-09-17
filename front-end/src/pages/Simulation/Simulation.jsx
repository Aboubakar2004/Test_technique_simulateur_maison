import React, { useState } from "react";
import "../Simulation/Simulation.css";
import { simulationApi } from "../../api/client";

function Simulation() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    prix_bien: "",
    duree_annees: "",
    taux_interet: "",
    taux_assurance: "",
    apport: "",
    frais_notaire_pct: "",
    travaux: "",
    debut_pret: "",
    revalorisation_bien_pct: "",
    frais_agence_pct: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimulate = async () => {
    if (isVisible) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5001/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          prix_bien: Number(form.prix_bien || 0),
          duree_annees: Number(form.duree_annees || 0),
          taux_interet: Number(form.taux_interet || 0),
          taux_assurance: Number(form.taux_assurance || 0),
          apport: Number(form.apport || 0),
          frais_notaire_pct: Number(form.frais_notaire_pct || 0),
          travaux: Number(form.travaux || 0),
          revalorisation_bien_pct: Number(form.revalorisation_bien_pct || 0),
          frais_agence_pct: Number(form.frais_agence_pct || 0),
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Erreur de simulation");
      setResult(json.data);
      setIsVisible(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSimulation = async () => {
    if (!result) {
      setSaveMessage("Aucune simulation à sauvegarder");
      return;
    }

    setSaving(true);
    setSaveMessage("");
    try {
      await simulationApi.save({
        borrowing_capacity: result.capacite_emprunt,
        debt_ratio: result.taux_endettement,
        total_project_cost: result.cout_projet,
        total_credit_cost: result.cout_credit,
        estimated_monthly_payment: result.mensualite,
      });
      setSaveMessage(
        "Simulation sauvegardée avec succès, retrouve-la dans l'onglet mon espace !"
      );
    } catch (e) {
      setSaveMessage("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="simulation-container">
      <div className={`simulation-form ${isVisible ? "slide-left" : ""}`}>
        <div>
          <h3 className="title-style">Prix du logement (€)</h3>
          <input
            name="prix_bien"
            value={form.prix_bien}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Durée (années)</h3>
          <input
            name="duree_annees"
            value={form.duree_annees}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Taux d'intérêt (%)</h3>
          <input
            name="taux_interet"
            value={form.taux_interet}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Taux d'assurance (%)</h3>
          <input
            name="taux_assurance"
            value={form.taux_assurance}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Apport (€)</h3>
          <input
            name="apport"
            value={form.apport}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Frais de notaire (%)</h3>
          <input
            name="frais_notaire_pct"
            value={form.frais_notaire_pct}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Travaux (€)</h3>
          <input
            name="travaux"
            value={form.travaux}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Début du prêt (date)</h3>
          <input
            name="debut_pret"
            value={form.debut_pret}
            onChange={handleChange}
            type="date"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">
            Revalorisation <br /> annuelle du bien (%)
          </h3>
          <input
            name="revalorisation_bien_pct"
            value={form.revalorisation_bien_pct}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div>
          <h3 className="title-style">Frais d'agence (%)</h3>
          <input
            name="frais_agence_pct"
            value={form.frais_agence_pct}
            onChange={handleChange}
            type="number"
            className="simulation-input"
          />
        </div>
        <div className="button-container">
          {!isVisible && (
            <button
              className="simulate-button"
              onClick={handleSimulate}
              disabled={loading}
            >
              {loading ? "Calcul..." : "Simuler"}
            </button>
          )}
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </div>
      </div>

      <div className={`simulation-result ${isVisible ? "slide-in" : ""}`}>
        <div className="simulation-result-content">
          <h3>Résultat de la simulation</h3>
          <div className="result-content">
            <div className="main-item">
              <span className="main-label">Mensualité éstimé</span>
              <span className="main-value">
                {result ? `${result.mensualite.toLocaleString()} €` : "-"}
              </span>
            </div>
            <div className="sub-item">
              <div className="result-item">
                <span className="result-label">Coût total du crédit :</span>
                <span className="result-value">
                  {result ? `${result.cout_credit.toLocaleString()} €` : "-"}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Coût total du projet :</span>
                <span className="result-value">
                  {result ? `${result.cout_projet.toLocaleString()} €` : "-"}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Taux d'endettement :</span>
                <span className="result-value">
                  {result ? `${result.taux_endettement}%` : "-"}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Capacité d'emprunt :</span>
                <span className="result-value">
                  {result
                    ? `${result.capacite_emprunt.toLocaleString()} €`
                    : "-"}
                </span>
              </div>
            </div>
          </div>
          <button
            className="back-button"
            onClick={() => window.location.reload()}
          >
            Nouvelle simulation
          </button>
          <button
            className="save-button"
            onClick={handleSaveSimulation}
            disabled={saving}
          >
            {saving ? "Sauvegarde..." : "Sauvegarder la simulation"}
          </button>
          {saveMessage && (
            <div
              style={{
                marginTop: "10px",
                color: saveMessage.includes("succès") ? "green" : "red",
                textAlign: "center",
              }}
            >
              {saveMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulation;
