import "./StatsSection.css";

const stats = [
    { number: "50k+", label: "Serviços Prestados" },
    { number: "1.2k", label: "ONGs Verificadas" },
    { number: "200+", label: "Cidades Alcançadas" },
    { number: "R$ 4.5M", label: "Recursos Facilitados" }
];

export default function StatsSection() {
    return (
        <section className="stats-section">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-item ${index !== stats.length - 1 ? "with-divider" : ""}`}>
                        <h2 className="stat-number">{stat.number}</h2>
                        <p className="stat-label">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
