import React from "react";
import { useAuth } from "../context/AuthContext";
import "../components/UnauthorizedRoute.css";

function UnauthorizedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (user) {
    return (
      <div className="unauthorized-container">
        <div>
          <h1 className="unauthorized-title">Accès non autorisé</h1>
          <h2>Vous n'êtes pas autorisé à avoir accès à cette page.</h2>
          <h2>
            Vous êtes déjà connecté. Retournez à la{" "}
            <a href="/">page d'accueil</a>.
          </h2>
        </div>
      </div>
    );
  }

  return children;
}

export default UnauthorizedRoute;
