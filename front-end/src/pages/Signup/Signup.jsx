import React from "react";
import "../Signup/Signup.css";

function SignUp() {
  return (
    <div className="sign-up-page-container">
      <div className="sign-up-page-content">
        <div className="sign-up-title">
          <h1>Inscription</h1>
        </div>
        <div className="email">
          Email
          <input type="email" className="email-input" />
        </div>
        <div className="password">
          Mots de passe
          <input type="password" className="password-input" />
        </div>
        <button className="sign-up-page-button">S'inscrire</button>
      </div>
    </div>
  );
}

export default SignUp;
