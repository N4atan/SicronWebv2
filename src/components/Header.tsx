import React from "react";
import "./Header.css";
import logoImage from "../assets/Logo.svg"; // coloca a imagem na pasta src/assets/

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="Logo Sicron" className="logo-img" />
        <h1 className="logo">Sicron</h1>
      </div>

      <nav className="nav">
        <a href="#" className="nav-link">Início</a>
        <a href="#" className="nav-link">ONGs</a>
        <a href="#" className="nav-link">Sobre Nós</a>
      </nav>
    </header>
  );
}
