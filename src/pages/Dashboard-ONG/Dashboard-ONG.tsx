import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllOngs, getOngByUuid } from "../../services/ong.service";
import { getAllProducts, removeProductFromNGO } from "../../services/product.service";
import { NGO, NGOProduct, Product } from "../../interfaces";
import { Oval } from "react-loader-spinner";
import { faPlus, faTrash, faHandHoldingHeart, faCoins, faCubes, faTruck, faCogs, faUsers, faSquare, faBoxOpen, faHome } from "@fortawesome/free-solid-svg-icons";
import Aside from "../../components/Aside/Aside";
import EntityModal from "../../components/Forms/Entity/EntityModal";
import HomeTab from "./Tabs/HomeTab";
import NeedsTab from "./Tabs/NeedsTab";
import SettingsTab from "./Tabs/SettingsTab";
import SuppliersTab from "./Tabs/SuppliersTab";

export default function DashboardONG() {
    const { user } = useAuth();
    const [ngo, setNgo] = useState<NGO | null>(null);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | NGOProduct | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [tabActive, setActiveTab] = useState('home');

    const loadDataNGO = async () => {
        setIsLoading(true);
        try {
            const myOng: NGO[] = await getAllOngs({ manager_uuid: user!.uuid!.toString() });
            if (!myOng || myOng.length === 0) return;
            const detailedNgo = await getOngByUuid(myOng[0].uuid!);
            setNgo(detailedNgo);
        } catch (e) {
            console.error("Erro ao carregar dashboard:", e);
        } finally {
            setIsLoading(false);
        }
    }

    const loadDataProducts = async () => {
        try {
            const products = await getAllProducts();
            setAvailableProducts(products.filter((product) => product.supplierProducts!.length > 0));
        } catch (e) {
            console.error("Erro ao carregar produtos:", e);
        }
    }

    useEffect(() => {
        loadDataNGO();
        loadDataProducts();
    }, [user]);

    const onSuccessAddItem = () => {
        setAddModalVisible(false);
        loadDataNGO();
    }

    const handleEditItem = (product: Product | NGOProduct) => {
        setSelectedProduct(product);
        setEditModalVisible(true);
    }

    const handleRemoveItem = async (ngoProduct: NGOProduct) => {
        if (!confirm("Remover esta necessidade da lista?")) return;
        try {
            await removeProductFromNGO(ngoProduct.id.toString());
            loadDataNGO();
        } catch (e) {
            alert("Erro ao remover.");
        }
    }

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Oval color="#2BB673" height={60} width={60} /></div>;

    if (!ngo) return (
        <div style={{ padding: 50, textAlign: 'center' }}>
            <h2>Você ainda não tem uma ONG cadastrada.</h2>
            <p>Clique em "Minha ONG" no menu para cadastrar.</p>
        </div>
    );

    return (
        <main style={{ display: 'flex', overflow: 'hidden', height: '100vh' }}>
            <Aside
                options={[
                    { label: "Início", icon: faHome, value: "home" },
                    { label: "Necessidades", icon: faHandHoldingHeart, value: "necessities" },
                    { label: "Doações", icon: faBoxOpen, value: "donations", onClick: () => alert("Em Desenvolvimento...") },
                    { label: "Fornecedores", icon: faTruck, value: "suppliers" },
                    { label: "Equipe", icon: faUsers, value: "team", onClick: () => alert("Em Desenvolvimento...") },
                    { label: "Configurações", icon: faCogs, value: "settings" },
                ]}
                activeTab={tabActive}
                setActiveTab={setActiveTab}
            />

            <section style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f4f4f4' }}>
                {tabActive === 'home' && (
                    <HomeTab
                        ngo={ngo}
                        availableProductsCount={availableProducts.length}
                        onAddClick={() => availableProducts.length > 0 ? setAddModalVisible(true) : alert("Nenhum item disponível para adicionar.")}
                    />
                )}

                {tabActive === 'necessities' && (
                    <NeedsTab
                        ngo={ngo}
                        onDelete={handleRemoveItem}
                        onEdit={handleEditItem}
                    />
                )}

                {tabActive === 'suppliers' && (
                    <SuppliersTab />
                )}

                {tabActive === 'settings' && (
                    <SettingsTab
                        ngo={ngo}
                        onSuccess={loadDataNGO}
                        onLoading={setIsLoading}
                    />
                )}
            </section>

            {editModalVisible && (
                <EntityModal
                    title="Editar Item"
                    entity={selectedProduct}
                    typeEntity="ngoProduct"
                    parentUuid={ngo.uuid!}
                    onRefresh={() => { setEditModalVisible(false); loadDataNGO(); }}
                    onClose={() => setEditModalVisible(false)}
                />
            )}

            {addModalVisible && (
                <EntityModal
                    title="Adicionar Item"
                    typeEntity="ngoProduct"
                    parentUuid={ngo.uuid!}
                    availableOptions={availableProducts}
                    onRefresh={() => onSuccessAddItem()}
                    onClose={() => setAddModalVisible(false)}
                />
            )}
        </main>
    )
}
