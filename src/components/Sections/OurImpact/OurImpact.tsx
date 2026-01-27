import "./OurImpact.css";
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
            <div className="impact-container">
                <div className="impact-text-side">
                    <h2 className="title-section">Conexão e Transparência</h2>
                    <p className="impact-description">
                        O SICRON nasceu para revolucionar a solidariedade. Mais do que uma plataforma digital,
                        criamos uma conexão direta com as necessidades urgentes das instituições.
                        <br /><br />
                        Permitimos que você escolha exatamente o impacto que deseja causar —
                        financiando a compra de itens específicos, desde alimentos até materiais essenciais,
                        com a garantia de que chegarão a quem precisa.
                    </p>
                </div>

                <div className="impact-grid-side">
                    {dataCards.map((data, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={data.icon} />
                            </div>
                            <h3 className="feature-title">{data.title}</h3>
                            <p className="feature-sub">{data.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
