import "./OurImpact.css";

import imgMain from "../../assets/images/mulheres.jpg";
import img1 from "../../assets/images/Kid.jpg";
import img2 from "../../assets/images/homem.png";
import img3 from "../../assets/images/mundo-origami-papel.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faFileInvoiceDollar, faHandHoldingHeart, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Card from '../Card/Card';

export default function OurImpact() {
    return (
        <section className="our-impact">

            <div className="impact-text">
                <h2 className="title-section">Conexão e Transparência</h2>

                <p>
                    O SICRON nasceu para revolucionar a solidariedade, atuando como a ponte segura entre a sua vontade de ajudar e quem realmente precisa. Mais do que uma plataforma digital, criamos uma conexão direta com as necessidades urgentes das instituições, permitindo que você escolha exatamente o impacto que deseja causar — financiando a compra de itens específicos, desde alimentos até materiais essenciais.
                </p>

                <div className="impact-cards">
                    <div className="card">
                        <strong><FontAwesomeIcon icon={faShieldHalved} /></strong>
                        <span>ONGs Verificadas</span>
                    </div>
                    <div className="card">
                        <strong><FontAwesomeIcon icon={faFileInvoiceDollar} /></strong>
                        <span>Transparência Total</span>
                    </div>
                    <div className="card">
                        <strong><FontAwesomeIcon icon={faBoxOpen} /></strong>
                        <span>Itens Entregues</span>
                    </div>
                    <div className="card">
                        <strong><FontAwesomeIcon icon={faHandHoldingHeart} /></strong>
                        <span>Entrega Garantida</span>
                    </div>
                </div>

                <p className="impact-sub">
                    Nossa missão é transformar incerteza em resultados garantidos. Por isso, cuidamos de toda a logística operacional: asseguramos que sua doação monetária seja convertida no item escolhido e entregue corretamente à ONG, oferecendo 100% de transparência com o envio das notas fiscais para você. É tecnologia e empatia trabalhando juntas para fechar o ciclo de confiança entre quem doa e quem recebe.
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
