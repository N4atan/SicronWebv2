



import Header from '../../components/Header/Header';
import './ExploreOngs.css'
import Input from '../../components/Inputs/Input/Input';
import OngRequestCard from '../../components/OngRequestCard/OngRequestCard';
import { getAllOngs, NGO } from "../../services/ong.service";
import { useEffect, useState } from "react";

import Card from '../../components/Card/Card';
import { Oval } from 'react-loader-spinner';


export default function ExploreOngs() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataOngs, setDataOngs] = useState<NGO[]>([]);

    // Estados para filtros
    const [searchName, setSearchName] = useState('');
    const [searchArea, setSearchArea] = useState('');
    const [debouncedName, setDebouncedName] = useState('');

    // Debounce para o input de texto (evita muitas requisições)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(searchName);
        }, 800); // 800ms de delay
        return () => clearTimeout(timer);
    }, [searchName]);


    const fetchData = async (filters: Partial<NGO> = {}) => {
        setIsLoading(true); // Opcional: mostrar loading a cada busca ou só na primeira? 
        // Se for a cada busca, pode piscar a tela. 
        // Vou deixar só se for a primeira vez ou usar um loading state local menor se quiser.
        // Mas para MVP, recarregar tudo é ok.
        try {
            // O backend espera { name: '...', area: '...' }
            const response = await getAllOngs(filters);
            if (response) setDataOngs(response);

        } catch (e: unknown) {
            console.error('Erro ao buscar dados:', e);
        } finally {
            setIsLoading(false);
        }
    };

    // Efeito para buscar quando os filtros (debounced) mudam
    useEffect(() => {
        const filters: Partial<NGO> = {};

        if (debouncedName) filters.trade_name = debouncedName; // Ou 'name', depende do que o backend prioriza na busca ou se implementa ILIKE
        if (searchArea && searchArea !== 'Selecione a Causa') filters.area = searchArea;

        fetchData(filters);
    }, [debouncedName, searchArea]);



    return (
        <>


            <div className='container-text'>
                <h1>Encontre a causa que move o seu coração.</h1>
                <h2>Explore nossa rede de ONGs parceiras, conheça suas histórias e descubra como a sua doação pode transformar vidas hoje mesmo.</h2>
            </div>

            <main className="container-page-explorer">
                <aside>
                    <details className="group-details" open>
                        <summary className="custom-summary">
                            <span>Facilite a Busca</span>
                            <span className="icon">▼</span>
                        </summary>

                        <div className="content">
                            <Input
                                variant="default"
                                label="Nome da ONG:"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Digite o nome..."
                            />

                            <Input
                                variant="selection"
                                label="Qual a Causa?"
                                options={['Selecione a Causa', 'Assistência Social', 'Saúde', 'Educação e Pesquisa', 'Meio Ambiente']}
                                value={searchArea}
                                onChange={(e) => setSearchArea(e.target.value)}
                            />
                        </div>
                    </details>
                </aside>

                <div className="container-results-ongs" style={{ position: 'relative', minHeight: '200px' }}>

                    {/* Loading Overlay Sutil para Buscas Subsequentes */}
                    {isLoading && (
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Oval
                                height={50}
                                width={50}
                                color="#2BB673"
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#e0e0e0"
                                strokeWidth={4}
                            />
                        </div>
                    )}

                    {/* Mensagem de Vazio */}
                    {!isLoading && dataOngs.length === 0 && (
                        <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: '#666', gridColumn: '1 / -1' }}>
                            <p>Nenhuma ONG encontrada com esses filtros.</p>
                        </div>
                    )}

                    {/* Lista de Resultados */}
                    {dataOngs
                        .filter(ong => ong.status === 'approved')
                        .map((ong) => (
                            <OngRequestCard key={ong.uuid} ongRequest={ong} variant="public" />
                        ))
                    }
                </div>
            </main>
        </>
    )
}