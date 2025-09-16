import { Link, useNavigate } from "react-router-dom";
import SimulioLogo from "../assets/images/EaC8l601.svg";
import "../components/Header.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="header-component">
      <div className="simulio-logo">
        <img src={SimulioLogo} alt="Simulio Logo" />
      </div>
      <div>
        <div className="user-groupe">
          {loading ? null : user ? (
            <div className="header-button-groupe">
              <button className="my-space-button">
                <h3>Mon espace</h3>
              </button>
              <button className="logout-button" onClick={handleLogout}>
                <h3>Se déconnecter</h3>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-button">
                <h3>Se connecter</h3>
              </Link>
              <Link to="/signup" className="signup-button">
                <h3>S'inscrire</h3>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
