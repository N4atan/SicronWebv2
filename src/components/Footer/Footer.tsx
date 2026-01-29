import "./Footer.css";
import LogoComponent from "../../assets/icons/Logo.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faEnvelope, faShareNodes } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1: Brand & Info */}
        <div className="footer-brand">
          <div className="footer-logo">
            <LogoComponent className="footer-logo-icon" />
            <span className="footer-logo-text">SICRON</span>
          </div>
          <p className="footer-desc">
            Unindo a lacuna entre cidadãos compassivos e as organizações que podem transformar essa compaixão em mudança tangível.
          </p>
          <div className="footer-socials">
            <a href="#"><FontAwesomeIcon icon={faEarthAmericas} /></a>
            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="#"><FontAwesomeIcon icon={faShareNodes} /></a>
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="footer-links">
          <h4>Institucional</h4>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Nosso Time</a></li>
            <li><a href="#">Relatórios de Impacto</a></li>
            <li><a href="#">Carreiras</a></li>
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div className="footer-links">
          <h4>Explorar</h4>
          <ul>
            <li><a href="#">Diretório de ONGs</a></li>
            <li><a href="#">Solicitações de Serviço</a></li>
            <li><a href="#">Portal do Voluntário</a></li>
            <li><a href="#">Portal de Doação</a></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Cookies</a></li>
            <li><a href="#">Acessibilidade</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Soluções SICRON. Todos os direitos reservados.</p>
        <div className="footer-bottom-links">
          <span>Português (BR)</span>
          <span>Global</span>
        </div>
      </div>
    </footer>
  );
}