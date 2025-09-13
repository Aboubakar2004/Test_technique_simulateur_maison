import React from "react";
import "../Home/Home.css";
import Header from "../../components/Header";

function Home() {
  return (
    <div>
      <Header />
      <h1 className="home-title">Ceci est la page d'acceuil</h1>
    </div>
  );
}

export default Home;
