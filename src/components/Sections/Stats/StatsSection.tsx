import "./StatsSection.css";

const stats = [
    { value: '50k+', label: 'Serviços Prestados' },
    { value: '1.2k', label: 'ONGs Verificadas' },
    { value: '200+', label: 'Cidades Alcançadas' },
    { value: 'R$4.5M', label: 'Doações Facilitadas' }
];

export default function StatsSection() {
    return (
        <section className="stats-section">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div className="stat-item" key={index}>
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
