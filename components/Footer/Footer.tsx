import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section about">
          <h3>Sobre Nós</h3>
          <p>
            Criando experiências digitais incríveis desde 2025.
            Comprometidos com qualidade e inovação.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">ONGs</a></li>
            <li><a href="#">Sobre nós</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contato</h3>
          <ul>
            <li>Av. Campina, 1003<br />São leopoldo, RS</li>
            <li>(51) 9834-5638</li>
            <li>sicron@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sicron. Todos os direitos reservados.</p>
        <div className="footer-legal">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
