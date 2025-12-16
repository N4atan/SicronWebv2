/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { getAll as getAllUsers, User } from "../../services/user.service";
import { getAllOngs, NGO } from "../../services/ong.service";
import EntityUpdate from "../../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../../components/Table/DynamicTable/DynamicTable";
import EntityCreate from "../../components/Forms/EntityCreate/EntityCreate";
import Button from "../../components/Button/Button";
import OngRequestCard from "../../components/OngRequestCard/OngRequestCard";
import './Dashboard-Admin.css';
import TabCadastro from "./Tabs/Tab-Registros/Tab-Registros";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBorderAll, faBuildingNgo, faCubes, faSeedling, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import TabRegistro from "./Tabs/Tab-Registros/Tab-Registros";
import TabOngs from "./Tabs/Tab-Ongs/Tab-Ongs";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import Modal from "../../components/Modal/Modal";

// Defino um tipo para evitar erros de string solta
export type EntityType = 'user' | 'ong';

const opçõesAside = [
    {
        label: 'Cadastros',
        icon: faAddressCard,
        value: 'cadastros'
    },
    {
        label: 'ONGs',
        icon: faBuildingNgo,
        value: 'ongs'
    }
]

export default function DashboardAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataUsers, setDataUsers] = useState<User[]>([]);
    const [dataOngs, setDataOngs] = useState<NGO[]>([]);

    const [tabActive, setTabActive] = useState<'cadastros' | 'ongs'>('cadastros');

    // Função genérica para buscar dados
    const fetchData = async (entity: EntityType) => {
        try {
            // Não setamos isLoading false aqui dentro para não conflitar
            if (entity === 'user') {
                const response = await getAllUsers();
                if (response) setDataUsers(response);
            }

            if (entity === 'ong') {
                const response = await getAllOngs();
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


    return (
        <main style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                <aside style={{ width: '200px', backgroundColor: '#ffff', overflowY: 'auto', borderRight: '1px solid rgb(0, 0, 0, 0.1)' }}>

                    <ul className="ul-tabs" >
                        <li onClick={() => alert('Em Desenvolvimento...')}>
                            <input type="radio" name="tab" id="tab-geral" />
                            <label htmlFor="tab-geral">
                                <FontAwesomeIcon icon={faCubes} />
                                Visão Geral
                            </label>
                        </li>

                        {opçõesAside.map((opção) => (
                            <li
                                key={opção.value}
                                onClick={() => setTabActive(opção.value as 'cadastros' | 'ongs')}
                                className={tabActive === opção.value ? 'active' : ''}
                            >
                                <input
                                    type="radio"
                                    name="tab"
                                    id={`tab-${opção.value}`}
                                    checked={tabActive === opção.value}
                                    readOnly
                                />
                                <label htmlFor={`tab-${opção.value}`}>
                                    <FontAwesomeIcon icon={opção.icon} />
                                    {opção.label}
                                </label>

                            </li>
                        ))}

                        <li onClick={() => alert('Em Desenvolvimento...')}>
                            <input type="radio" name="tab" id="tab-produtos" />
                            <label htmlFor="tab-produtos">
                                <FontAwesomeIcon icon={faSeedling} />
                                Produtos
                            </label>
                        </li>
                    </ul>


                </aside>

                <section style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>

                    {tabActive === 'cadastros' && (
                        <TabRegistro
                            onfreshData={fetchData}
                            isLoading={isLoading}
                            dataUsers={dataUsers}
                            dataOngs={dataOngs}
                        />
                    )}
                    {tabActive === 'ongs' && (
                        <TabOngs
                            dataOngs={dataOngs}
                            isLoading={isLoading}
                            onRefreshData={fetchData}
                        />

                    )}

                </section>



            </div>
        </main>
    );
}