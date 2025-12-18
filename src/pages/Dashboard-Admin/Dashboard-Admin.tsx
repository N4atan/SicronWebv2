/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAll as getAllUsers } from "../../services/user.service";
import { User, NGO, Supplier, Product } from "../../interfaces";
import { getAllOngs } from "../../services/ong.service";
import { getAllSuppliers } from "../../services/supplier.service";
import './Dashboard-Admin.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBorderAll, faBuildingNgo, faCubes, faSeedling, faTableCellsLarge, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import TabRegistro from "./Tabs/Tab-Registros/Tab-Registros";
import TabOngs from "./Tabs/Tab-Ongs/Tab-Ongs";
import TabFornecedores from "./Tabs/Tab-Fornecedores/Tab-Fornecedores";
import TabProdutos from "./Tabs/Tab-Produtos/Tab-Produtos";



import { getAllProducts } from "../../services/product.service";

// ... (imports)


export type EntityType = 'user' | 'ong' | 'supplier' | 'product';

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
    },
    {
        label: 'Fornecedores',
        icon: faTruckFast,
        value: 'fornecedores'
    },
    {
        label: 'Produtos',
        icon: faSeedling,
        value: 'produtos'
    }
]

export default function DashboardAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataUsers, setDataUsers] = useState<User[]>([]);
    const [dataOngs, setDataOngs] = useState<NGO[]>([]);
    const [dataSuppliers, setDataSuppliers] = useState<Supplier[]>([]);
    const [dataProducts, setDataProducts] = useState<Product[]>([]);

    const [tabActive, setTabActive] = useState<'cadastros' | 'ongs' | 'fornecedores' | 'produtos'>('cadastros');


    const fetchData = async (entity: EntityType) => {
        try {

            if (entity === 'user') {
                const response = await getAllUsers();
                if (response) setDataUsers(response);
            }

            if (entity === 'ong') {
                const response = await getAllOngs();
                if (response) setDataOngs(response);
            }

            if (entity === 'supplier') {
                const response = await getAllSuppliers();
                if (response) setDataSuppliers(response);
            }

            if (entity === 'product') {
                const response = await getAllProducts();
                if (response) setDataProducts(response);
            }
        } catch (e: any) {
            console.error('Erro ao buscar dados:', e);
        }
    };


    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchData('user'),
                    fetchData('ong'),
                    fetchData('supplier'),
                    fetchData('product')
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
                                onClick={() => setTabActive(opção.value as any)}
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
                    </ul>


                </aside>

                <section style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>

                    {tabActive === 'cadastros' && (
                        <TabRegistro
                            onfreshData={fetchData}
                            isLoading={isLoading}
                            dataUsers={dataUsers}
                            dataOngs={dataOngs}
                            dataSuppliers={dataSuppliers}
                            dataProducts={dataProducts}
                        />
                    )}
                    {tabActive === 'ongs' && (
                        <TabOngs
                            dataOngs={dataOngs}
                            isLoading={isLoading}
                            onRefreshData={fetchData}
                        />

                    )}
                    {tabActive === 'fornecedores' && (
                        <TabFornecedores
                            dataSuppliers={dataSuppliers}
                            isLoading={isLoading}
                            onRefreshData={fetchData}
                        />
                    )}
                    {tabActive === 'produtos' && (
                        <TabProdutos />
                    )}

                </section>



            </div>
        </main>
    );
}