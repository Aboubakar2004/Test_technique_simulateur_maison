import React, { useState } from "react";
import "../Signup/Signup.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Échec de l'inscription");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="sign-up-page-container">
      <div className="sign-up-page-content">
        <div className="sign-up-title">
          <h1>Inscription</h1>
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
            className="sign-up-page-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Inscription..." : "S'inscrire"}
          </button>
          <div className="have-account">
            <p>Vous avez un compte ?</p>
            <a href="/login">Se connecter</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
