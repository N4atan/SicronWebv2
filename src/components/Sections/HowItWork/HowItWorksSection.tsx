import "./HowItWorksSection.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faSeedling, faRotate } from "@fortawesome/free-solid-svg-icons";


const guia_passos = [
    {
        icon: faSeedling,
        title: 'ONGs Cadastram suas Necessidades',
        subtitle: 'Organizações,especificando quantidades e detalhes.'
    }, {
        icon: faHandHoldingHeart,
        title: 'Doadores Escolhem Como Ajudar',
        subtitle: 'Navegue pelo catálogo de ONGs, filtre por região e selecione os itens que deseja patrocinar.'
    }, {
        icon: faRotate,
        title: 'A Plataforma Cuida de Tudo',
        subtitle: 'Seu dinheiro vira historia que fica na plataforma, onde a ONG escolhe fornecedores com preços expostos, faz a compra e reúnice os itens.'
    }

]



export default function HowItWorksSection() {
    return (
        <section className="how-section">
            <div className="how-header">
                <h2 className="title-section">Como Funciona</h2>
                <p className="subtitle-section">
                    Doar nunca foi tão simples e transparente
                </p>
            </div>

            <div className="guia-container">
                
                { guia_passos.map((step, index) => (
                    <div className="guia-passo" key={index}>
                        <FontAwesomeIcon icon={step.icon} className="card-icon"/>

                        <h3 className="card-text">
                            { step.title }
                        </h3>

                        <p className="card-subtitle">
                            { step.subtitle }
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
}
