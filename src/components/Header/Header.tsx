import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Sobre' },
    { to: '/explorar', label: 'ONGs' },
    { to: '/services', label: 'Serviços' },
    { to: '/impact', label: 'Impacto' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* 1. LOGO */}
        <Link to="/" className="logo-area" onClick={() => setMenuIsOpen(false)}>
          <div className="logo-icon">
            <LogoComponent />
          </div>
          <span className="logo-text">SICRON</span>
        </Link>


        {/* 2. DESKTOP NAV */}
        <nav className="desktop-nav">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 3. ACTIONS (Search + Buttons) */}
        <div className="header-actions">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Buscar ONGs..." />
          </div>

          <Link to="/login" className="login-link">
            Entrar
          </Link>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <FontAwesomeIcon icon={menuIsOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuIsOpen && (
        <div className="mobile-menu">
          <nav>
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="mobile-nav-link"
                onClick={() => setMenuIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-actions">
              <Link to="/login" onClick={() => setMenuIsOpen(false)}>Entrar</Link>
              <Link to="/cadastros" onClick={() => setMenuIsOpen(false)}>Participe</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
