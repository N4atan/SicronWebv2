import "./HeroSection.css";
import heroImage from "../assets/images/humildade.webp"; // coloca a imagem na pasta src/assets/

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1 className="hero-title">
          Conectando doadores<br />a quem realmente precisa
        </h1>
        <p className="hero-subtitle">
          Faça a diferença na vida de pessoas de<br />forma segura e transparente
        </p>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="Doadores ajudando pessoas" />
      </div>
    </section>
  );
}
