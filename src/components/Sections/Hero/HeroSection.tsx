import "./HeroSection.css";
import saImage from "../../../assets/images/Kids-happy.jpg";
import Button from "../../Button/Button";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1 className="hero-title">
          Conectando doadores<br />a quem realmente precisa
        </h1>
        
        <p className="hero-subtitle">
          Faça a diferença na vida de pessoas de forma segura e transparente. O SICRON garante que sua ajuda chegue ao destino certo, transformando doações digitais em impacto real.
        </p>

        <div className="container-buttons-hero">
          <Button 
            variant={'primary'} text={"Conhecer Causas"}  style={{height: '100%'}}
          />

          <Button 
            variant={'secondary'}
            text={'Como funciona ?'}
            style={{height: '100%'}}
            onClick={() => document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth'})}
          />
        </div>
      </div>

      <div className="hero-image">
        <img src={saImage} alt="Doadores ajudando pessoas"/>
      </div>
    </section>
  );
}