import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../contexts/AuthContext";
import { getOngByUuid } from "../services/ong.service";
import { addProductToNGO, getAllProducts, removeProductFromNGO } from "../services/product.service";
import { NGO, NGOProduct, Product } from "../interfaces";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faHandHoldingHeart, faCoins } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";
import '../pages/Dashboard-Admin/Dashboard-Admin.css'; // Reuse style

export default function DashboardONG() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [ngo, setNgo] = useState<NGO | null>(null);
    const [ngoProducts, setNgoProducts] = useState<NGOProduct[]>([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedProductUuid, setSelectedProductUuid] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (!user?.uuid) return;
            // Busca ONG do usuário
            const { getAllOngs } = await import("../services/ong.service");
            // @ts-ignore
            const myOngs = await getAllOngs({ manager_uuid: user.uuid });

            if (myOngs && myOngs.length > 0) {
                const myNgo = myOngs[0];
                setNgo(myNgo);

                // Busca detalhes completos (incluindo supplierProducts para preço)
                const detailedNgo = await getOngByUuid(myNgo.uuid!);
                if (detailedNgo) {
                    setNgo(detailedNgo);
                    // @ts-ignore
                    if (detailedNgo.products) setNgoProducts(detailedNgo.products);
                }
            } else {
                setNgo(null);
            }
        } catch (e) {
            console.error("Erro ao carregar dashboard:", e);
        } finally {
            setIsLoading(false);
        }
    }

    const loadAllProducts = async () => {
        const p = await getAllProducts();

        setAllProducts(p);
    }

    useEffect(() => {
        if (user) loadData();
    }, [user]);

    const handleOpenModal = () => {
        loadAllProducts();
        setIsModalOpen(true);
        setQuantity(1);
        setSelectedProductUuid("");
    }

    const handleAddItem = async () => {
        if (!ngo?.uuid || !selectedProductUuid) return;
        setIsSaving(true);
        try {
            const prod = allProducts.find(p => p.uuid === selectedProductUuid);
            if (!prod) return;

            const result = await addProductToNGO(ngo.uuid, {
                name: prod.name,
                quantity,
                notes: ""
            });

            if (result) {
                alert("Necessidade adicionada com sucesso!");
                setIsModalOpen(false);
                loadData();
            } else {
                alert("Erro ao adicionar.");
            }
        } catch (e) {
            alert("Erro inesperado.");
        } finally {
            setIsSaving(false);
        }
    }

    const handleRemoveItem = async (itemId: number) => {
        if (!confirm("Remover esta necessidade da lista?")) return;
        try {

            // @ts-ignore
            await removeProductFromNGO(itemId);

            loadData();
        } catch (e) {
            alert("Erro ao remover.");
        }
    }


    const getEstimatedPrice = (item: any) => {
        // item é NGOProduct
        // item.product.supplierProducts é array de SupplierProduct (com price)
        const supplierProducts = item.product?.supplierProducts;
        if (!supplierProducts || supplierProducts.length === 0) return null;

        const prices = supplierProducts.map((sp: any) => Number(sp.price));
        if (prices.length === 0) return null;

        const sum = prices.reduce((a: number, b: number) => a + b, 0);
        const avg = sum / prices.length;


        const min = Math.min(...prices);

        return { avg, min, count: prices.length };
    }

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Oval color="#2BB673" height={60} width={60} /></div>;

    if (!ngo) return (
        <>
            <div style={{ padding: 50, textAlign: 'center' }}>
                <h2>Você ainda não tem uma ONG cadastrada.</h2>
                <p>Clique em "Minha ONG" no menu para cadastrar.</p>
            </div>
        </>
    );

    return (
        <>
            <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '28px', color: '#333' }}>Painel da ONG - {ngo.trade_name || ngo.name}</h1>
                    <p style={{ color: '#666' }}>Gerencie as necessidades de doação da sua organização.</p>
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
                        <span style={{ marginRight: '20px' }}>Status: <strong>{ngo.status?.toLowerCase() === 'approved' ? 'Aprovada' : ngo.status}</strong></span>
                        <span>CNPJ: {ngo.cnpj}</span>
                    </div>
                </div>

                {ngo.status?.toLowerCase() !== 'approved' ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
                        <h2>ONG não aprovada</h2>
                        <p>Sua ONG ainda não foi aprovada. Aguarde a aprovação para adicionar necessidades.</p>
                    </div>
                ) : (
                    <>
                        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            <Card titleSection="Itens Necessários">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <FontAwesomeIcon icon={faHandHoldingHeart} size="2x" color="#2bb673" />
                                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngoProducts.length} Itens</div>
                                </div>
                            </Card>
                            <Card titleSection="Acesso Rápido">
                                <Button text="+ Adicionar Necessidade" onClick={handleOpenModal} variant="primary" style={{ width: '100%' }} />
                            </Card>
                        </div>

                        <Card titleSection="Necessidades de Doação" subtitleSection="Estes itens ficarão visíveis para doadores e fornecedores.">
                            {ngoProducts.length === 0 ? <p style={{ padding: 20, textAlign: 'center', color: '#999' }}>Nenhuma necessidade cadastrada.</p> : (
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                                    <thead>
                                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                                            <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Item</th>
                                            <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Categoria</th>
                                            <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Qtd. Necessária</th>
                                            <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Valor de Mercado (Estimado)</th>
                                            <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ngoProducts.map((item: any) => {
                                            const priceInfo = getEstimatedPrice(item);
                                            return (
                                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                                    <td style={{ padding: 12 }}>
                                                        <div style={{ fontWeight: 'bold' }}>{item.product?.name}</div>
                                                        <div style={{ fontSize: '12px', color: '#777' }}>{item.product?.description}</div>
                                                    </td>
                                                    <td style={{ padding: 12 }}>{item.product?.category || '-'}</td>
                                                    <td style={{ padding: 12 }}>{item.quantity}</td>
                                                    <td style={{ padding: 12 }}>
                                                        {priceInfo ? (
                                                            <div>
                                                                <div style={{ fontWeight: 'bold', color: '#2BB673' }}>
                                                                    ~ R$ {priceInfo.avg.toFixed(2)}
                                                                </div>
                                                                <small style={{ color: '#666', fontSize: '11px' }}>
                                                                    Mín: R$ {priceInfo.min.toFixed(2)} ({priceInfo.count} ofertas)
                                                                </small>
                                                            </div>
                                                        ) : (
                                                            <span style={{ color: '#999', fontStyle: 'italic' }}>Sem ofertas disponíveis</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: 12 }}>
                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            title="Remover Necessidade"
                                                            style={{ color: '#d33', border: 'none', background: '#fff', cursor: 'pointer', padding: 5 }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </Card>
                    </>
                )}
            </div>

            {isModalOpen && (
                <Modal
                    title="Adicionar Necessidade"
                    pText="Adicionar"
                    sText="Cancelar"
                    pEvent={handleAddItem}
                    sEvent={() => setIsModalOpen(false)}
                    xEvent={() => setIsModalOpen(false)}
                    isLoading={isSaving}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Produto</label>
                            <small style={{ display: 'block', color: '#666', marginBottom: 5 }}>Apenas produtos ofertados por fornecedores estão listados.</small>
                            <select style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={selectedProductUuid} onChange={e => setSelectedProductUuid(e.target.value)}>
                                <option value="">Selecione um produto...</option>
                                {allProducts.filter(p => p.supplierProducts && p.supplierProducts.length > 0).map(p => <option key={p.uuid} value={p.uuid}>{p.name} ({p.category})</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Quantidade</label>
                            <input type="number" min="1" style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}