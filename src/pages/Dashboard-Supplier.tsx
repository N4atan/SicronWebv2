import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../contexts/AuthContext";
import { getSupplierByUuid, getAllSuppliers } from "../services/supplier.service";
import { Product, SupplierProduct, Supplier } from "../interfaces";
import { getAllProducts } from "../services/product.service";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faBoxOpen, faTruckFast, faUsers, faAddressCard, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";
import '../pages/Dashboard-Admin/Dashboard-Admin.css'; // Reusing some admin styles for consistency
import Aside from "../components/Aside/Aside";
import SupplierForm from "../components/Forms/Entity/SupplierForm";
import DynamicTable from "../components/Table/DynamicTable/DynamicTable";


export default function DashboardSupplier() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [supplier, setSupplier] = useState<Supplier>({} as Supplier);
    const [myProducts, setMyProducts] = useState<SupplierProduct[]>([]);


    const [isModalOpen, setIsModalOpen] = useState(false);



    const [selectedProductUuid, setSelectedProductUuid] = useState("");

    const [tabActive, setTabActive] = useState('home');



    const loadData = async () => {
        setIsLoading(true);
        try {
            const haveSupplier: Supplier[] = await getAllSuppliers({ manager_uuid: user!.uuid });

            if (!haveSupplier || haveSupplier.length === 0) {
                return;
            }

            const detailedSupplier = await getSupplierByUuid(String(haveSupplier[0].uuid));

            setSupplier(detailedSupplier!);

        } catch (e) {
            console.error("Erro ao carregar dashboard:", e);
            alert("Erro ao carregar dashboard: " + e);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        loadData();
    }, []);

    const opçõesAside = [
        {
            label: supplier.tradeName,
            icon: faBriefcase,
            value: 'home'
        },
        {
            label: 'Ofertas',
            icon: faBoxOpen,
            value: 'ofertas'
        },
        {
            label: 'Vendas',
            icon: faTruckFast,
            value: 'vendas',
            onClick: () => alert('Em Desenvolvimento...')
        },
        {
            label: 'Equipe',
            icon: faUsers,
            value: 'equipe',
            onClick: () => alert('Em Desenvolvimento...')
        }
    ]

    const handleRemoveItem = async (id: number) => {
        if (!confirm("Remover esta oferta?")) return;
        try {
            await api.delete(`/supplier-products/product/${id}`);
            loadData();
        } catch (e) {
            alert("Erro ao remover.");
        }
    }

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Oval color="#2BB673" height={60} width={60} /></div>;
    }

    if (!supplier) {
        return (
            <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
                <h2>Fornecedor não aprovado</h2>
                <p>Sua empresa ainda não foi aprovada. Aguarde a aprovação para adicionar produtos.</p>
            </div>
        )
    }

    return (
        <main style={{ display: 'flex', flexDirection: 'column',  overflow: 'hidden' }}>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                <Aside
                    options={opçõesAside}
                    activeTab={tabActive}
                    setActiveTab={(val) => setTabActive(val as any)}
                />

                <section style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>

                    {tabActive === 'home' && (
                        <Card
                            titleSection="Informações Gerais"
                            subtitleSection="Gerencie os dados da sua empresa"
                        >

                            <SupplierForm 
                                initialData={supplier}
                                onSuccess={() => loadData()}
                                onLoading={() => setIsLoading(true)}
                            />
                        </Card>
                    )}

                    {tabActive === 'ofertas' && (
                        <Card
                            titleSection="Meus Produtos à Venda"
                            subtitleSection="Estes produtos ficarão visíveis para as ONGs."
                        >
                            <DynamicTable
                                listData={supplier.products!}
                                onDelete={handleRemoveItem}
                                onEdit={() => {}}
                                typeData="supplier"
                            />
                        </Card>
                    )}

                </section>

            </div>

        </main>
    )
}
