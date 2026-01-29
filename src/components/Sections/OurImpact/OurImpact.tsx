import "./OurImpact.css";

import imgMain from "../../../assets/images/mulheres.jpg";
import img1 from "../../../assets/images/Kid.jpg";
import img2 from "../../../assets/images/homem.png";
import img3 from "../../../assets/images/mundo-origami-papel.jpg"; // Placeholder if needed

const featuredNGOs = [
    {
        image: imgMain,
        tag: 'Social',
        title: 'Mãos que Ajudam',
        desc: 'Liderando esforços de inclusão social e distribuição de alimentos em comunidades vulneráveis.',
        link: '#'
    },
    {
        image: img1,
        tag: 'Educação',
        title: 'Futuro Brilhante',
        desc: 'Mentoria e desenvolvimento de habilidades para jovens desprivilegiados.',
        link: '#'
    },
    {
        image: img2,
        tag: 'Saúde',
        title: 'Cuidar Mais',
        desc: 'Apoio direto e serviços especializados para idosos que vivem sozinhos.',
        link: '#'
    },
];

export default function OurImpact() {
    return (
        <section className="featured-section">
            <div className="featured-header">
                <h2 className="title-section">ONGs em Destaque</h2>
                <a href="/explorar" className="view-all-link">Ver todas &rarr;</a>
            </div>

            <div className="ngo-grid">
                {featuredNGOs.map((ngo, index) => (
                    <div className="ngo-card" key={index}>
                        <div className="ngo-image-container">
                            <span className="ngo-tag">{ngo.tag}</span>
                            <img src={ngo.image} alt={ngo.title} />
                        </div>
                        <div className="ngo-content">
                            <h3 className="ngo-title">{ngo.title}</h3>
                            <p className="ngo-desc">{ngo.desc}</p>
                            <a href={ngo.link} className="ngo-link">Saiba Mais</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
