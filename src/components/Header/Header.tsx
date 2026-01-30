import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faSearch, faUser, faHandHoldingHeart, faBriefcase, faCubes, faRightFromBracket, faHouse, faMap } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../services/user.service";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
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

  // Links de Navegação Principal
  const navLinks = [
    { to: '/', label: 'Sobre', icon: faHouse },
    { to: '/ongs', label: 'ONGs', icon: faMap },
    { to: '/participe', label: 'Participe', icon: faHandHoldingHeart },
  ];

  // Links do Usuário (Dropdown / Mobile)
  const isOngManager = user?.role === UserRole.NGO_MANAGER;

  const userLinks = [
    { to: '/perfil/me', label: 'Meu Perfil', icon: faUser, state: undefined },
    {
      to: isOngManager ? '/dashboard/ong' : '/cadastro/ong',
      label: 'Minha ONG',
      icon: faHandHoldingHeart,
      state: !isOngManager ? { email: user?.email, type: 'ong' } : undefined
    },
    {
      to: user?.role === UserRole.SUPPLIER_MANAGER ? '/dashboard/supplier' : '/cadastro/supplier',
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
          {navLinks.map((link, index) => (
            <Link key={index} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 3. ACTIONS (Search + Buttons) */}
        <div className="header-actions">

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
                    {user?.role === UserRole.ADMIN && (
                      <li>
                        <Link to="/dashboard/admin" onClick={() => setUserMenuOpen(false)} className="dropdown-item">
                          <FontAwesomeIcon icon={faCubes} className="icon-width" />
                          Dashboard Admin
                        </Link>
                      </li>
                    )}

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
            <Button
              text="Entrar"
              variant="secondary"
              style={{ width: "100px" }}
              onClick={() => navigate('/entrar')}
            />
          )}

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
            {/* NAVEGAÇÃO PRINCIPAL */}
            {navLinks.map((link, index) => (
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
              {user ? (
                <>
                  {userLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.to}
                      state={link.state}
                      onClick={() => setMenuIsOpen(false)}
                      className="mobile-nav-link"
                      style={{ fontSize: '1rem', color: '#666' }}
                    >
                      <FontAwesomeIcon icon={link.icon} style={{ marginRight: '8px' }} />
                      {link.label}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="mobile-nav-link" style={{ color: '#d32f2f', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/entrar" onClick={() => setMenuIsOpen(false)}>Entrar</Link>
                  <Link to="/cadastros" onClick={() => setMenuIsOpen(false)}>Participe</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
