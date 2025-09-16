import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Chargement...
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est connecté, afficher le composant protégé
  return children;
}

export default ProtectedRoute;
