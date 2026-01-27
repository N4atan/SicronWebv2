import "./HowItWorksSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faSeedling, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const steps = [
    {
        icon: faSeedling,
        title: 'ONGs Cadastram',
        description: 'Organizações especificam suas necessidades e quantidades.',
        animation: 'bounce'
    },
    {
        icon: faHandHoldingHeart,
        title: 'Doadores Escolhem',
        description: 'Navegue pelo catálogo, filtre por causa e escolha quem ajudar.',
        animation: 'bounce'
    },
    {
        icon: faRotate,
        title: 'Plataforma Cuida',
        description: 'Garantimos a compra e logística, transformando doação em item entregue.',
        animation: 'spin'
    }
]

export default function HowItWorksSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="how-section" id='how-section'>
            <div className="how-header">
                <h2 className="title-section">Como Funciona</h2>
                <p className="subtitle-section">
                    Doar nunca foi tão simples e transparente
                </p>
            </div>

            <div className="steps-container">
                {steps.map((step, index) => (
                    <div
                        className="step-card"
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="icon-wrapper">
                            <FontAwesomeIcon
                                icon={step.icon}
                                bounce={hoveredIndex === index && step.animation === 'bounce'}
                                spin={hoveredIndex === index && step.animation === 'spin'}
                            />
                        </div>
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-desc">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
