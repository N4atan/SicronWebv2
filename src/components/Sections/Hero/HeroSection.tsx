import "./HeroSection.css";
import saImage from "../../../assets/images/Kids-happy.jpg";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${saImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Conectando<br />
          Comunidades à<br />
          Solidariedade.
        </h1>

        <p className="hero-subtitle">
          Empoderando pessoas para encontrar apoio e organizações para estender seu alcance. Descubra ONGs locais ou solicite serviços vitais com apenas alguns cliques.
        </p>

        <div className="hero-buttons">
          <Button
            variant={'primary'}
            text={"Explorar ONGs"}
            className="btn-hero-primary"
            onClick={() => navigate('/explorar')}
          />

          <Button
            variant={'secondary'}
            text={'Solicitar Ajuda'}
            className="btn-hero-secondary"
            onClick={() => document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
    </section>
  );
}

