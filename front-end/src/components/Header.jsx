import { Link } from "react-router-dom";
import SimulioLogo from "../assets/images/EaC8l601.svg";
import "../components/Header.css";

function Header() {
  return (
    <div className="header-component">
      <div className="simulio-logo">
        <img src={SimulioLogo} alt="Simulio Logo" />
      </div>
      <div>
        <div className="user-groupe">
          <Link to="/login" className="login-button">
            <h3>Se connecter</h3>
          </Link>
          <Link to="/signup" className="signup-button">
            <h3>S'inscrire</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
