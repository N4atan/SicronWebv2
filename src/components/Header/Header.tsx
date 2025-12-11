import "./Header.css";
import LogoComponent from "../../assets/icons/Logo.svg?react"; // Ajuste o caminho se necessário
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../Button/Button"; // Ajuste o caminho se necessário

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Lista de links para evitar repetição de código
  const links = [
    { to: '/', label: 'Início' },
    { to: '/explorar', label: 'Explora ONGs' },
    { to: '/cadastros', label: 'Cadastros' },

  ];

  return (
    <header className={`header ${menuIsOpen ? "menu-open" : ""}`}>

      {/* 1. LOGO (Sempre Visível) */}
      <div className="logo-container">
        <LogoComponent className="logo-img" />
        <h1 className="logo">SICRON</h1>
      </div>

      {/* 2. DESKTOP VIEW (Visível apenas em telas grandes) */}
      <div className="container-desktop-view">
        {/* Nav Centralizada */}
        <nav className="nav nav-desktop">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botão na Direita */}
        <Link to="/login" className="nav-link" onClick={() => setMenuIsOpen(false)}>
          <Button variant="primary" text={"Entrar"} />
        </Link>
      </div>

      {/* 3. MOBILE VIEW (Visível apenas em telas pequenas) */}
      <div className="container-mobile-view">

        {/* Ícone Hambúrguer / X com círculo */}
        <div
          className={`menu-toggle-button ${menuIsOpen ? 'open' : ''}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <FontAwesomeIcon
            icon={menuIsOpen ? faXmark : faBars}
            size="lg"
          />
        </div>

        {/* Menu Dropdown Flutuante */}
        <div className={`container-toggle-menu ${menuIsOpen ? "active" : ""}`}>

          <nav className="nav-mobile">
            <ul className="mobile-list">
              {links.map((link, index) => (
                <li key={index} className="mobile-item">
                  <Link
                    to={link.to}
                    className="nav-link"
                    onClick={() => setMenuIsOpen(false)} // Fecha o menu ao clicar
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="mobile-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuIsOpen(false)}>
                  ENTRAR  
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </header>
  );
}