import "./Header.css";
import logoImage from "../assets/Logo.svg";
import { Link } from "react-router-dom"; // importa o Link do react-router

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="Logo Sicron" className="logo-img" />
        <h1 className="logo">Sicron</h1>
      </div>

      <nav className="nav">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/" className="nav-link">ONGs</Link>
        <Link to="/sobre" className="nav-link">Sobre Nós</Link>
        <Link to="/Login" className="nav-link">👤</Link>
      </nav>
    </header>
  );
}
