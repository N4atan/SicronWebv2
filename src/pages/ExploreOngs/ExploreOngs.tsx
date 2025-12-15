



import Header from './../../components/Header/Header';
import './ExploreOngs.css'
import Input from './../../components/Inputs/Input/Input';
import OngRequestCard from './../../components/OngRequestCard/OngRequestCard';
import { getAllOngs, NGO } from "../../services/ong.service";
import { useEffect, useState } from "react";

import Card from './../../components/Card/Card';


export default function ExploreOngs() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataOngs, setDataOngs] = useState<NGO[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAllOngs({});
            if (response) setDataOngs(response);

        } catch (e: unknown) {
            console.error('Erro ao buscar dados:', e);
        }
    };

    // Carregamento inicial (com Promise.all para esperar OS DOIS terminarem)
    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            try {
                await fetchData()

            } catch (e: unknown) {
                alert(e);
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();


    }, []);




    return (
        <>


            <div className='container-text'>
                <h1>Encontre a causa que move o seu coração.</h1>
                <h2>Explore nossa rede de ONGs parceiras, conheça suas histórias e descubra como a sua doação pode transformar vidas hoje mesmo.</h2>
            </div>


            {isLoading && dataOngs.length == 0 && (
                <Card>
                    <p>Carregando ONGs ...</p>
                </Card>
            )}

            {!isLoading && (
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
                                // Implementar filtro de nome...
                                />

                                <Input
                                    variant="selection"
                                    label="Qual a Causa?"
                                    options={['Selecione a Causa', 'Assistência Social', 'Saúde', 'Educação e Pesquisa', 'Meio Ambiente']}
                                />
                            </div>
                        </details>
                    </aside>

                    <div className="container-results-ongs">
                        {dataOngs
                            .filter(ong => ong.status === 'approved') // Apenas aprovadas
                            .map((ong) => (
                                <OngRequestCard key={ong.uuid} ongRequest={ong} variant="public" />
                            ))
                        }
                    </div>
                </main>
            )}

        </>
    )
}