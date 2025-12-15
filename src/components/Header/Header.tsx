import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser, faBuilding, faHandHoldingHeart, faRightFromBracket, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState(false); // Mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // User dropdown (Desktop/Logged)

  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  const links = [
    { to: '/', label: 'Início' },
    { to: '/explorar', label: 'Explorar ONGs' },
  ];

  const handleLogout = () => {
    signOut();
    setUserMenuOpen(false);
  }

  return (
    <header className={`header ${menuIsOpen ? "menu-open" : ""}`}>

      {/* 1. LOGO */}
      <div className="logo-container">
        <LogoComponent className="logo-img" />
        <h1 className="logo">SICRON</h1>
      </div>

      {/* 2. DESKTOP VIEW */}
      <div className="container-desktop-view">
        <nav className="nav nav-desktop">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="user-menu-wrapper" ref={dropdownRef}>
            <button
              className={`user-hamburger-btn ${userMenuOpen ? 'active' : ''}`}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="Menu do Usuário"
            >
              <FontAwesomeIcon icon={userMenuOpen ? faXmark : faBars} />
            </button>

            {userMenuOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-header">
                  <span className="user-name">Olá, <strong>{user.username || 'Usuário'}</strong></span>
                </div>

                <ul className="dropdown-list">
                  <li>
                    <Link to="/perfil/me" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                      <FontAwesomeIcon icon={faUser} className="icon-width" />
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/minha-ong" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                      <FontAwesomeIcon icon={faHandHoldingHeart} className="icon-width" />
                      Minha ONG
                    </Link>
                  </li>
                  <li>
                    <Link to="/minha-empresa" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                      <FontAwesomeIcon icon={faBriefcase} className="icon-width" />
                      Minha Empresa
                    </Link>
                  </li>
                  <hr className="dropdown-divider" />
                  <li>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <FontAwesomeIcon icon={faRightFromBracket} className="icon-width" />
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link">
            <Button variant="primary" text={"Entrar"} />
          </Link>
        )}
      </div>

      {/* 3. MOBILE VIEW (Simplificado para manter consistência ou usar lógica própria) */}
      <div className="container-mobile-view">
        <div
          className={`menu-toggle-button ${menuIsOpen ? 'open' : ''}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <FontAwesomeIcon icon={menuIsOpen ? faXmark : faBars} size="lg" />
        </div>

        <div className={`container-toggle-menu ${menuIsOpen ? "active" : ""}`}>
          <nav className="nav-mobile">
            <ul className="mobile-list">
              {links.map((link, index) => (
                <li key={index} className="mobile-item">
                  <Link
                    to={link.to}
                    className="nav-link"
                    onClick={() => setMenuIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {user ? (
                <>
                  <li className="mobile-item">
                    <Link to="/perfil/me" className="nav-link" onClick={() => setMenuIsOpen(false)}>
                      <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} /> Meu Perfil
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <Link to="/minha-ong" className="nav-link" onClick={() => setMenuIsOpen(false)}>
                      <FontAwesomeIcon icon={faHandHoldingHeart} style={{ marginRight: '8px' }} /> Minha ONG
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <Link to="/minha-empresa" className="nav-link" onClick={() => setMenuIsOpen(false)}>
                      <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '8px' }} /> Minha Empresa
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <div className="nav-link" onClick={() => { signOut(); setMenuIsOpen(false); }} style={{ cursor: 'pointer', color: '#dc3545' }}>
                      <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} /> Sair
                    </div>
                  </li>
                </>
              ) : (
                <li className="mobile-item">
                  <Link to="/login" className="nav-link" onClick={() => setMenuIsOpen(false)}>
                    ENTRAR
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

    </header>
  );
}