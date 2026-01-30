/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAll as getAllUsers } from "../../services/user.service";
import { User, NGO, Supplier, Product } from "../../interfaces";
import { getAllOngs } from "../../services/ong.service";
import { getAllSuppliers } from "../../services/supplier.service";
import Aside from "../../components/Aside/Aside";
import { faHome, faUsers, faHandHoldingHeart, faTruck, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import TabRegistro from "./Tabs/Tab-Registros/Tab-Registros";
import TabOngs from "./Tabs/Tab-Ongs/Tab-Ongs";
import TabFornecedores from "./Tabs/Tab-Fornecedores/Tab-Fornecedores";
import TabProdutos from "./Tabs/Tab-Produtos/Tab-Produtos";
import { getAllProducts } from "../../services/product.service";

export type EntityType = 'user' | 'ong' | 'supplier' | 'product';

export default function DashboardAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataUsers, setDataUsers] = useState<User[]>([]);
    const [dataOngs, setDataOngs] = useState<NGO[]>([]);
    const [dataSuppliers, setDataSuppliers] = useState<Supplier[]>([]);
    const [dataProducts, setDataProducts] = useState<Product[]>([]);

    const [tabActive, setTabActive] = useState<'home' | 'ongs' | 'fornecedores' | 'produtos'>('home');


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
        <main style={{ display: 'flex', overflow: 'hidden', height: 'calc(100vh - 70px)' }}>
            <Aside
                options={[
                    { label: 'Visão Geral', icon: faHome, value: 'home' },
                    { label: 'ONGs', icon: faHandHoldingHeart, value: 'ongs' },
                    { label: 'Fornecedores', icon: faTruck, value: 'fornecedores' },
                    { label: 'Produtos', icon: faBoxOpen, value: 'produtos' },
                    { label: 'Usuários', icon: faUsers, value: 'users', onClick: () => alert('Gerenciamento de usuários em breve...') }
                ]}
                activeTab={tabActive}
                setActiveTab={(val) => setTabActive(val as any)}
            />

            <section style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f4f4f4' }}>
                {tabActive === 'home' && (
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
        </main>
    );
}