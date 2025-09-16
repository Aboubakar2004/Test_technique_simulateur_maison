import React, { useState } from "react";
import "../Login/Login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Échec de la connexion");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <div className="login-title">
          <h1>Connexion</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="email">
            Email
            <input
              type="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password">
            Mots de passe
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div style={{ color: "red", marginTop: "8px" }}>{error}</div>
          )}
          <button
            className="login-page-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Connexion..." : "Se connecter"}
          </button>
          <div className="have-account">
            <p>Vous n'avez un compte ?</p>
            <a href="/signup">S'inscrire</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
