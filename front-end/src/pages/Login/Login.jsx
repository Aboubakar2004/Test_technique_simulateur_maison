import React from "react";
import "../Login/Login.css";

function Login() {
  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <div className="connexion-title">
          <h1>Connexion</h1>
        </div>
        <div className="email">
          Email
          <input type="email" className="email-input" />
        </div>
        <div className="password">
          Mots de passe
          <input type="password" className="password-input" />
        </div>
        <button className="login-button">Se connecter</button>
      </div>
    </div>
  );
}

export default Login;
