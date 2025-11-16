import "./OurImpact.css";

import imgMain from "../../assets/images/mulheres.jpg";
import img1 from "../../assets/images/Kid.jpg";
import img2 from "../../assets/images/homem.png";
import img3 from "../../assets/images/mundo-origami-papel.jpg";

export default function OurImpact() {
    return (
        <section className="our-impact">

            <div className="impact-text">
                <h2>Nosso impacto</h2>

                <p>
                    Ao longo dos anos, a gente transformou vidas e abriu portas para muita gente.
                    Com iniciativas voltadas à educação, saúde e desenvolvimento social,
                    nossos projetos têm gerado resultados reais, criando oportunidades,
                    fortalecendo comunidades e construindo um futuro mais digno pra todos que passam por aqui.
                </p>

                <div className="impact-cards">
                    <div className="card">
                        <strong>5,000+</strong>
                        <span>Pessoas Atendidas</span>
                    </div>
                    <div className="card">
                        <strong>15</strong>
                        <span>Anos de Historia</span>
                    </div>
                    <div className="card">
                        <strong>30+</strong>
                        <span>Comunidades Alcançadas</span>
                    </div>
                    <div className="card">
                        <strong>95%</strong>
                        <span>Taxa de Sucesso</span>
                    </div>
                </div>

                <p className="impact-sub">
                    Cada número representa uma história de superação,
                    um sonho realizado e um futuro mais promissor.
                    E isso só é possível com o apoio de pessoas generosas como você.
                </p>
            </div>

            <div className="impact-media">
                <img src={imgMain} alt="Main impact" className="main-impact-img" />

                <div className="impact-images">
                    <img src={img1} alt="/" />
                    <img src={img2} alt="/" />
                    <img src={img3} alt="/" />
                </div>
            </div>

        </section>
    );
}
