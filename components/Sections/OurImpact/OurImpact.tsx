import "./OurImpact.css";

import imgMain from "../../../assets/images/mulheres.jpg";
import img1 from    "../../../assets/images/Kid.jpg";
import img2 from    "../../../assets/images/homem.png";
import img3 from    "../../../assets/images/mundo-origami-papel.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faFileInvoiceDollar, faHandHoldingHeart, faShieldHalved } from "@fortawesome/free-solid-svg-icons";


export default function OurImpact() {

    const dataCards = [
        {
            icon: faShieldHalved,
            title: 'ONGs Verificadas',
            sub: 'Todas as instituições passam por rigorosa auditoria.'
        },
        {
            icon: faFileInvoiceDollar,
            title: 'Transparência Total',
            sub: 'Acesso completo às notas fiscais e relatórios.'
        },
        {
            icon: faBoxOpen,
            title: 'Itens Entregues',
            sub: 'Garantimos que o item comprado chegue ao local certo.'
        },
        {
            icon: faHandHoldingHeart,
            title: 'Conexão Direta',
            sub: 'Crie laços reais com as comunidades que você apoia.'
        }
    ]

    return (
        <section className="our-impact">

            <div className="impact-text">
                <h2 className="title-section">Conexão e Transparência</h2>

                <p>
                    O SICRON nasceu para revolucionar a solidariedade, atuando como a ponte segura entre a sua vontade de ajudar e quem realmente precisa. Mais do que uma plataforma digital, criamos uma conexão direta com as necessidades urgentes das instituições, permitindo que você escolha exatamente o impacto que deseja causar — financiando a compra de itens específicos, desde alimentos até materiais essenciais.
                </p>

                <div className="impact-cards">
                    { dataCards.map((data) => (
                        <div className="card">
                            <div><FontAwesomeIcon icon={data.icon} /></div>
                            <span>{data.title}</span>
                            <span>{data.sub}</span>
                        </div>
                    ))}
                </div>

                
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
