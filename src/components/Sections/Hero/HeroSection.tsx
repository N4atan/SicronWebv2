import "./HeroSection.css";
import image1 from "../../../assets/images/hero_1.png";
import image2 from "../../../assets/images/hero_2.png";
import image3 from "../../../assets/images/hero_3.png";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text-side">
          <h1 className="hero-title">
            Conectando doadores<br /> a quem realmente precisa
          </h1>

          <p className="hero-subtitle">
            Faça a diferença na vida de pessoas de forma segura e transparente.
            O SICRON garante que sua ajuda chegue ao destino certo, transformando doações digitais em impacto real.
          </p>

          <div className="hero-actions">
            <div className="button-wrapper">
              <Button
                variant={'primary'}
                text={"Conhecer Causas"}
                style={{ width: '100%', height: '50px' }}
                onClick={() => navigate('/explorar')}
              />
            </div>
            <div className="button-wrapper">
              <Button
                variant={'secondary'}
                text={'Como funciona?'}
                style={{ width: '100%', height: '50px' }}
                onClick={() => document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>
        </div>

        <div className="hero-visual-side">
          <div className="hero-grid-images">
            <div className="hero-img-col col-1">
              <img src={image3} alt="Mãos segurando planta" className="hero-img-item" />
            </div>
            <div className="hero-img-col col-2">
              <img src={image1} alt="Doação de alimentos" className="hero-img-item item-top" />
              <img src={image2} alt="Crianças brincando" className="hero-img-item item-bottom" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}