import "./HowItWorksSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHandshake, faChartLine } from "@fortawesome/free-solid-svg-icons";

// Adaptation to Portuguese to match project language
const steps = [
    {
        icon: faMagnifyingGlass,
        title: 'Descubra',
        subtitle: 'Encontre organizações e causas que ressoam com suas necessidades específicas ou valores pessoais usando nossa ferramenta inteligente.'
    },
    {
        icon: faHandshake,
        title: 'Conecte-se',
        subtitle: 'Fale diretamente com prestadores de serviço ou candidate-se a vagas de voluntariado. Nós cuidamos da verificação para sua segurança.'
    },
    {
        icon: faChartLine,
        title: 'Impacto',
        subtitle: 'Veja a diferença tangível que seu envolvimento faz na comunidade através de atualizações em tempo real e histórias de sucesso.'
    }
]

export default function HowItWorksSection() {
    return (
        <section className="how-section" id='how-section'>
            <div className="how-header">
                <h2 className="how-title">Como funciona</h2>
                <p className="how-subtitle">
                    Nossa plataforma simplifica o processo de encontrar e receber ajuda em três passos simples.
                </p>
            </div>

            <div className="how-grid">
                {steps.map((step, index) => (
                    <div className="how-card" key={index}>
                        <div className="how-icon-wrapper">
                            <FontAwesomeIcon icon={step.icon} className="how-icon" />
                        </div>
                        <h3 className="how-card-title">{step.title}</h3>
                        <p className="how-card-text">{step.subtitle}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
