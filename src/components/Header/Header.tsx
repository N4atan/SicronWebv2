import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser, faHouse, faHandHoldingHeart, faRightFromBracket, faBriefcase, faMap } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../services/user.service";

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


  // 1. Links de Navegação Principal
  const navLinks = [
    { to: '/', label: 'Início', icon: faHouse },
    { to: '/explorar', label: 'Explorar ONGs', icon: faMap },
  ];

  // 2. Links do Usuário (Dropdown / Mobile)
  const isOngManager = user?.role === UserRole.NGO_MANAGER;

  const userLinks = [
    { to: '/perfil/me', label: 'Meu Perfil', icon: faUser, state: undefined },
    {
      to: isOngManager ? '/dashboard-ong' : '/solicitar/ong',
      label: 'Minha ONG',
      icon: faHandHoldingHeart,
      state: !isOngManager ? { email: user?.email, type: 'ong' } : undefined
    },
    {
      to: user?.role === UserRole.SUPPLIER_MANAGER ? '/dashboard-supplier' : '/solicitar/ong',
      label: 'Minha Empresa',
      icon: faBriefcase,
      state: user?.role !== UserRole.SUPPLIER_MANAGER ? { email: user?.email, type: 'supplier' } : undefined
    },
  ];

  const handleLogout = () => {
    signOut();
    setUserMenuOpen(false);
    setMenuIsOpen(false);
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
          {navLinks.map((link, index) => (
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
                  {userLinks.map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} state={link.state} onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                        <FontAwesomeIcon icon={link.icon} className="icon-width" />
                        {link.label}
                      </Link>
                    </li>
                  ))}

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

      {/* 3. MOBILE VIEW (Agora usando os mesmos arrays) */}
      <div className="container-mobile-view">
        <button
          className={`menu-toggle-button ${menuIsOpen ? 'open' : ''}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          aria-label="Menu Mobile"
        >
          <FontAwesomeIcon icon={menuIsOpen ? faXmark : faBars} size="lg" />
        </button>

        <div className={`container-toggle-menu ${menuIsOpen ? "active" : ""}`}>
          <nav className="nav-mobile">
            <ul className="mobile-list">
              {/* NAVEGAÇÃO PRINCIPAL */}
              {navLinks.map((link, index) => (
                <li key={`nav-${index}`} className="mobile-item">
                  <Link
                    to={link.to}
                    className="nav-link"
                    onClick={() => setMenuIsOpen(false)}
                  >
                    <>
                      <FontAwesomeIcon icon={link.icon} style={{ marginRight: '10px', width: '20px', textAlign: 'center' }} />
                      {link.label}
                    </>
                  </Link>
                </li>
              ))}

              {/* OPÇÕES DO USUÁRIO (SE LOGADO) */}
              {user ? (
                <>
                  {userLinks.map((link, i) => (
                    <li key={`user-${i}`} className="mobile-item">
                      <Link to={link.to} state={link.state} className="nav-link" onClick={() => setMenuIsOpen(false)}>
                        <FontAwesomeIcon icon={link.icon} style={{ marginRight: '10px', width: '20px', textAlign: 'center' }} />
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  <li className="mobile-item">
                    <div
                      className="nav-link"
                      onClick={handleLogout}
                      style={{ cursor: 'pointer', color: '#dc3545' }}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '10px', width: '20px', textAlign: 'center' }} />
                      Sair
                    </div>
                  </li>
                </>
              ) : (
                <li className="mobile-item">
                  <Link to="/login" className="nav-link" onClick={() => setMenuIsOpen(false)} style={{ justifyContent: 'center', fontWeight: 'bold' }}>
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