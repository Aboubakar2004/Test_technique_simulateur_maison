import React from "react";
import "../Home/Home.css";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsCalculator } from "react-icons/bs";
import { LuCrosshair } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LuTabletSmartphone } from "react-icons/lu";
import Footer from "../../components/Footer";

function Home() {
  const { user } = useAuth();
  const simulationTarget = user ? "/simulation" : "/signup";
  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">
            Simulez votre prêt immobilier avec <br /> la plateforme la plus
            intuitive
          </h1>
          <p className="hero-subtitle">
            Calculez vos mensualités, frais et capacité d'emprunt <br /> en
            quelques clics avec notre simulateur intelligent
          </p>
          <div className="hero-button">
            <Link to={simulationTarget}>
              <button className="hero-cta">Commencer ma simulation</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="feature">
        <div className="feature-content" data-aos="fade-down">
          <h1>Calcul instantané</h1>
          <p>
            Obtenez vos mensualités et coûts totaux en quelques secondes
            <br />
            sans attente
          </p>
          <div>
            <BsCalculator className="calculator-icon" />
          </div>
        </div>
        <div className="feature-content" data-aos="fade-down">
          <h1>Résultats précis</h1>
          <p>
            Algorithmes professionnels incluant tous les frais : notaire
            <br />
            garantie bancaire, assurance
          </p>
          <div>
            <LuCrosshair className="crosshair-icon" />
          </div>
        </div>
        <div className="feature-content" data-aos="fade-down">
          <h1>100% gratuit</h1>
          <p>
            Aucun frais caché, aucune inscription requise. Simulez autant de
            <br />
            fois que vous voulez
          </p>
          <div>
            <RiMoneyDollarCircleLine className="money-icon" />
          </div>
        </div>
        <div className="feature-content" data-aos="fade-down">
          <h1>Compatible mobile</h1>
          <p>
            Interface optimisée pour tous les écrans <br />
            smartphone, tablette et ordinateur
          </p>
          <div>
            <LuTabletSmartphone className="smartphone-icon" />
          </div>
        </div>
      </section>
      <section className="cta-hero" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="cta-title">Prêt à calculer votre prêt ?</h1>
          <p className="cta-subtitle">
            Obtenez votre simulation personnalisée en moins de 2 minutes
          </p>
          <div className="cta-groupe-button">
            <Link to={simulationTarget}>
              <button className="cta-button">Simuler</button>
            </Link>
            <Link to="/header">
              <button className="learn-more">En savoir plus</button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
