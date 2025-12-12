import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useState } from "react";

export default function DashboardONG() {
    const [itens] = useState([
        {
            nome: "Cesta Básica Completa",
            descricao: "Cesta com alimentos essenciais para uma família de 4 pessoas por 1 mês",
            categoria: "Alimentação",
            valor: "R$ 120,00",
            progresso: "45 / 100",
            porcentagem: 45,
            prioridade: "Urgente"
        },
        {
            nome: "Kit Material Escolar",
            descricao: "Cadernos, canetas, lápis, borracha, apontador e mochila",
            categoria: "Educação",
            valor: "R$ 80,00",
            progresso: "30 / 80",
            porcentagem: 38,
            prioridade: "Urgente"
        }
    ]);

    return (
        <>
            <Header />


            <div style={{ textAlign: "initial", margin: "50px", fontSize: "13px" }}>

                <h1>Painel Administrativo - ONG</h1>
                <p>Gerencie os itens de doação da sua organização</p>


            </div>

            {/* Cards de resumo */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', height: '150px' }}>
                <Card titleSection="Total de Itens" style={{ width: '300px' }}>
                    <p>2</p>
                </Card>

                <Card titleSection="Valor Total Necessário" style={{ width: '300px' }}>
                    <p>R$ 18.400,00</p>
                </Card>

                <Card titleSection="Valor Total Recebido" style={{ width: '300px' }}>
                    <p>R$ 7.800,00</p>
                </Card>
            </div>

            {/* Seção de Itens de Doação */}
            <div style={{ margin: '50px auto', maxWidth: '1000px' }}>
                <Card
                    titleSection="Itens de Doação"
                    subtitleSection="Gerencie os itens necessários para sua ONG"
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Item</th>
                                <th style={{ padding: '10px' }}>Categoria</th>
                                <th style={{ padding: '10px' }}>Valor</th>
                                <th style={{ padding: '10px' }}>Progresso</th>
                                <th style={{ padding: '10px' }}>Prioridade</th>
                                <th style={{ padding: '10px' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map((item, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>
                                        <strong>{item.nome}</strong><br />
                                        <span style={{ fontSize: '12px', color: '#777' }}>{item.descricao}</span>
                                    </td>
                                    <td style={{ padding: '10px' }}>{item.categoria}</td>
                                    <td style={{ padding: '10px' }}>{item.valor}</td>
                                    <td style={{ padding: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>{item.progresso}</span>
                                            <div style={{ flex: 1, height: '6px', background: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${item.porcentagem}%`, height: '6px', background: '#111' }}></div>
                                            </div>
                                            <span>{item.porcentagem}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{
                                            background: '#e23',
                                            color: '#fff',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '12px'
                                        }}>
                                            {item.prioridade}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '5px' }}>🖋️</button>
                                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        style={{
                            background: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 14px',
                            cursor: 'pointer',
                            marginTop: '15px'
                        }}
                    >
                        + Adicionar Item
                    </button>
                </Card>
            </div>
        </>
        
    );
}