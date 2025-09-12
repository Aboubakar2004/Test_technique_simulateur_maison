import React from "react";
import "../Home/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="home-title">Ceci est la page d'acceuil</h1>
      <Link to="/login">
        <h2>Se connecter</h2>
      </Link>
      <Link to="/signup">
        <h2>S'inscrire</h2>
      </Link>
    </div>
  );
}

export default Home;
