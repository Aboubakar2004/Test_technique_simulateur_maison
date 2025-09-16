import React, { useState } from "react";
import "../Simulation/Simulation.css";

function Simulation() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="simulation-container">
      <div className={`simulation-form ${isVisible ? "slide-left" : ""}`}>
        <div>
          <h3 className="title-style">Prix du logement</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Durée</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Taux d'intérêt</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Taux d'assurance</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Apport</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Frais de notaire</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Travaux</h3>
          <input type="number" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">Début du prêt</h3>
          <input type="date" className="simulation-input" />
        </div>
        <div>
          <h3 className="title-style">
            Revalorisation <br /> annuelle du bien
          </h3>
          <input type="number" className="simulation-input" />
        </div>
        <div className="button-container">
          <button
            className="simulate-button"
            onClick={() => setIsVisible(true)}
          >
            Simuler
          </button>
        </div>
      </div>

      <div className={`simulation-result ${isVisible ? "slide-in" : ""}`}>
        <div className="simulation-result-content">
          <h3>Résultat de la simulation</h3>
          <div className="result-content">
            <div className="main-item">
              <span className="main-label">Mensualité éstimé</span>
              <span className="main-value">1 250 €</span>
            </div>
            <div className="sub-item">
              <div className="result-item">
                <span className="result-label">Coût total du crédit :</span>
                <span className="result-value">45 000 €</span>
              </div>
              <div className="result-item">
                <span className="result-label">Coût total du projet :</span>
                <span className="result-value">245 000 €</span>
              </div>
              <div className="result-item">
                <span className="result-label">Taux d'endettement :</span>
                <span className="result-value">28%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Capacité d'emprunt :</span>
                <span className="result-value">200 000 €</span>
              </div>
            </div>
          </div>
          <button
            className="back-button"
            onClick={() => window.location.reload()}
          >
            Nouvelle simulation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Simulation;
