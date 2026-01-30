import "./HowItWorksSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faUsers, faHandHoldingHeart, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";


const steps = [
    {
        icon: faMapLocationDot,
        title: 'Descubra',
        subtitle: 'Localize ONGs e projetos sociais próximos a você. Utilize nossos filtros para encontrar causas que precisam do seu apoio ou serviços que atendam às suas necessidades.'
    },
    {
        icon: faHandHoldingHeart,
        title: 'Conecte e Apoie',
        subtitle: 'Estabeleça um contato direto com as instituições para entender as necessidades reais de cada uma. Seja através de doações materiais ou apoio logístico, nossa plataforma facilita o diálogo para que sua ajuda chegue ao destino certo sem burocracia.'
    },
    {
        icon: faUsers,
        title: 'Fortaleça a Rede',
        subtitle: 'Acompanhe o ciclo da solidariedade e veja como a união entre doadores e organizações transforma a realidade local. Ao utilizar o Sicron, você ajuda a fortalecer a infraestrutura social da comunidade, garantindo que o apoio seja constante e sustentável para quem mais precisa.'
    }
]

export default function HowItWorksSection() {
    return (
        <section className="how-section" id='how-section'>
            <div className="how-header">
                <h2 className="title-section">Como funciona</h2>
                <p className="subtitle-section">
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
