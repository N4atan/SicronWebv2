import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Sicron. Todos os direitos reservados.</p>
      <div className="footer-links">
        <a href="#">Política de Privacidade</a>
        <a href="#">Termos de Uso</a>
        <a href="#">Contato</a>
      </div>
    </footer>
  );
}
