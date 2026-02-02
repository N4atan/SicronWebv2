import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getSupplierByUuid, getAllSuppliers } from "../../services/supplier.service";
import { getAllProducts } from "../../services/product.service";
import { api } from "../../services/api";
import { Product, SupplierProduct, Supplier } from "../../interfaces";
import { Oval } from "react-loader-spinner";
import { faBoxOpen, faTruckFast, faUsers, faBriefcase, faHome, faCogs } from "@fortawesome/free-solid-svg-icons";
import Aside from "../../components/Aside/Aside";
import EntityModal from "../../components/Forms/Entity/EntityModal";
import HomeTab from "./Tabs/HomeTab";
import OffersTab from "./Tabs/OffersTab";
import SettingsTab from "./Tabs/SettingsTab";
import CampaignsTab from "./Tabs/CampaignsTab";

export default function DashboardSupplier() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [allGlobalProducts, setAllGlobalProducts] = useState<Product[]>([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<SupplierProduct | null>(null);
    const [tabActive, setTabActive] = useState('home');

    const loadData = async () => {
        setIsLoading(true);
        try {
            const haveSupplier: Supplier[] = await getAllSuppliers({ manager_uuid: user!.uuid });
            if (!haveSupplier || haveSupplier.length === 0) return;

            const detailedSupplier = await getSupplierByUuid(String(haveSupplier[0].uuid));
            setSupplier(detailedSupplier!);

            // Load global products for selection
            const products = await getAllProducts();
            setAllGlobalProducts(products);

        } catch (e) {
            console.error("Erro ao carregar dashboard:", e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleRemoveItem = async (product: SupplierProduct) => {
        if (!confirm("Remover esta oferta?")) return;
        try {
            await api.delete(`/supplier-products/product/${product.id}`);
            loadData();
        } catch (e) {
            alert("Erro ao remover.");
        }
    }

    const handleEditItem = (product: SupplierProduct) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    }

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Oval color="#2BB673" height={60} width={60} /></div>;

    if (!supplier) return (
        <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
            <h2>Fornecedor não aprovado</h2>
            <p>Sua empresa ainda não foi aprovada ou cadastrada.</p>
        </div>
    );

    return (
        <main style={{ display: 'flex', overflow: 'hidden', height: 'calc(100vh - 70px)' }}>
            <Aside
                options={[
                    { label: "Início", icon: faHome, value: 'home' },
                    { label: 'Ofertas', icon: faBoxOpen, value: 'ofertas' },
                    { label: 'Campanhas', icon: faTruckFast, value: 'campanhas' },
                    { label: 'Equipe', icon: faUsers, value: 'equipe', onClick: () => alert('Em Desenvolvimento...') },
                    { label: 'Configurações', icon: faCogs, value: 'settings' }
                ]}
                activeTab={tabActive}
                setActiveTab={setTabActive}
            />

            <section style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f4f4f4' }}>
                {tabActive === 'home' && (
                    <HomeTab
                        supplier={supplier}
                        onAddClick={() => setIsAddModalOpen(true)}
                    />
                )}

                {tabActive === 'ofertas' && (
                    <OffersTab
                        supplier={supplier}
                        onDelete={handleRemoveItem}
                        onEdit={handleEditItem}
                        onAddClick={() => setIsAddModalOpen(true)}
                    />
                )}

                {tabActive === 'campanhas' && (
                    <CampaignsTab supplier={supplier} />
                )}

                {tabActive === 'settings' && (
                    <SettingsTab
                        supplier={supplier}
                        onSuccess={loadData}
                        onLoading={setIsLoading}
                    />
                )}
            </section>

            {isEditModalOpen && (
                <EntityModal
                    title="Editar Oferta"
                    entity={selectedProduct}
                    typeEntity="supplierProduct"
                    parentUuid={supplier.uuid}
                    onClose={() => setIsEditModalOpen(false)}
                    onRefresh={() => { setIsEditModalOpen(false); loadData(); }}
                />
            )}

            {isAddModalOpen && (
                <EntityModal
                    title="Adicionar Oferta"
                    typeEntity="supplierProduct"
                    parentUuid={supplier.uuid}
                    availableOptions={allGlobalProducts}
                    onClose={() => setIsAddModalOpen(false)}
                    onRefresh={() => { setIsAddModalOpen(false); loadData(); }}
                />
            )}
        </main>
    )
}
