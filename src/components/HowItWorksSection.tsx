import "./HowItWorksSection.css";
import card1Image from "../assets/comestível.png";
import card2Image from "../assets/confiança.png";
import card3Image from "../assets/ciclo.png";

export default function HowItWorksSection() {
    return (
        <section className="how-section">
            <div className="how-header">
                <h2 className="how-title">Como Funciona</h2>
                <p className="how-subtitle">
                    Doar nunca foi tão simples e transparente
                </p>
            </div>

            <div className="cards-container">
                <div className="card">
                    <img src={card1Image} alt="Passo 1" />
                    <h3 className="card-text">ONGs Cadastram suas Necessidades</h3>
                    <p className="how-subtitle">Organizações,especificando quantidades e detalhes.</p>
                </div>

                <div className="card">
                    <img src={card2Image} alt="Passo 2" />
                    <h3 className="card-text">Doadores Escolhem Como Ajudar</h3>
                    <p className="how-subtitle">Navegue pelo catálogo de ONGs, filtre por região e selecione os itens que deseja patrocinar.</p>
                </div>

                <div className="card">
                    <img src={card3Image} alt="Passo 3" />
                    <h3 className="card-text">A Plataforma Cuida de Tudo</h3>
                    <p className="how-subtitle">Seu dinheiro vira historia que fica na plataforma, onde a ONG escolhe fornecedores com preços expostos, faz a compra e reúnice os itens.</p>
                </div>
            </div>
        </section>
    );
}
