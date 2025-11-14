import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header className={`header ${menuOpen ? "menu-open" : ""}`}>
  <div className="logo-container">
    <LogoComponent className="logo-img" />
    <h1 className="logo">SICRON</h1>
  </div>

  <button
    className="menu-toggle"
    aria-label="Abrir menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
  </button>

  <nav className="nav">
    <Link to="/" className="nav-link">Início</Link>
    <Link to="/ongs" className="nav-link">ONGs</Link>
    <Link to="/sobre" className="nav-link">Sobre Nós</Link>
  </nav>

  <div className="tweaks">
    <Link to="/login" className="tweaks-link">
      <FontAwesomeIcon icon={faUser} />
    </Link>
    <Link to="/perfil" className="tweaks-link">
      <FontAwesomeIcon icon={faGear} />
    </Link>
  </div>
</header>
    );
}