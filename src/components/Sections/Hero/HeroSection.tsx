import "./HeroSection.css";
import saImage from "../../../assets/images/Kids-happy.jpg";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1 className="title-section">
          Conectando doadores<br />a quem realmente precisa
        </h1>
        <p className="subtitle-section">
          Faça a diferença na vida de pessoas de<br />forma segura e transparente
        </p>
      </div>

      <div className="hero-image">
        <img src={saImage} alt="Doadores ajudando pessoas"/>
      </div>
    </section>
  );
}