/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { api, SimplifiedUser, SimplifiedOng } from "../../services/api";
import EntityUpdate from "../../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../../components/Table/DynamicTable/DynamicTable";
import EntityCreate from "../../components/Forms/EntityCreate/EntityCreate";
import Button from "../../components/Button/Button";
import OngRequestCard from "../../components/OngRequestCard/OngRequestCard";
import './Dashboard-Admin.css';
import TabCadastro from "./Tabs/Cadastros/Cadastro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBuildingNgo } from "@fortawesome/free-solid-svg-icons";

// Defino um tipo para evitar erros de string solta
export type EntityType = 'user' | 'ong';

export default function DashboardAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataUsers, setDataUsers] = useState<SimplifiedUser[]>([]);
    const [dataOngs, setDataOngs] = useState<SimplifiedOng[]>([]);

    const [tabActive, setTabActive] = useState<'cadastros' | 'ongs'>('cadastros');

    // Função genérica para buscar dados
    const fetchData = async (entity: EntityType) => {
        try {
            // Não setamos isLoading false aqui dentro para não conflitar
            if (entity === 'user') {
                const response = await api.fetchUsers();
                if (response) setDataUsers(response);
            }

            if (entity === 'ong') {
                const response = await api.fetchOngs({});
                if (response) setDataOngs(response);
            }
        } catch (e: any) {
            console.error('Erro ao buscar dados:', e);
        }
    };

    // Carregamento inicial (com Promise.all para esperar OS DOIS terminarem)
    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchData('user'),
                    fetchData('ong')
                ]);
            } catch (e) {
                alert("Erro ao carregar painel");
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();


    }, []);
    
    
    console.log('Data Users:', dataUsers);
    console.log('Data Ongs:', dataOngs);

    return (
        <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                <aside style={{ width: '200px', backgroundColor: '#ffff', overflowY: 'auto', borderRight: '1px solid rgb(0, 0, 0, 0.1)'}}>
                        
                    <ul className="ul-tabs" >
                        <li>
                            <input type="radio" name="tab" id="tab-cadastros" onChange={() => setTabActive('cadastros')} />
                            <label htmlFor="tab-cadastros">
                                <FontAwesomeIcon icon={faAddressCard} />
                                Registros    
                            </label>
                        </li>

                        <li>
                            <input type="radio" name="tab" id="tab-ongs" onChange={() => setTabActive('ongs')} />
                            <label htmlFor="tab-ongs">
                                <FontAwesomeIcon icon={faBuildingNgo} />
                                Solicitações  
                            </label>
                        </li>
                    </ul>


                </aside>

                <section style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>

                    { tabActive === 'cadastros' && (
                        <TabCadastro
                            onfreshData={fetchData}
                            isLoading={isLoading}
                            dataUsers={dataUsers}
                            dataOngs={dataOngs}
                        />
                    )}
                    { tabActive === 'ongs' && (
                        /* Futuramente será um componente */
                        <div className="ong-container">
                            {
                                dataOngs.map((ong) => (
                                 <OngRequestCard ongRequest={ong} />                            
                                ))
                            } 
                        </div>
                    )}

                </section>

            </div>
        </main>
    );
}