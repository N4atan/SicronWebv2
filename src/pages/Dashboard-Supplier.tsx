import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../contexts/AuthContext";
import { getSupplierByUuid, getAllSuppliers, Supplier } from "../services/supplier.service";
import { getAllProducts, Product } from "../services/product.service";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faBoxOpen, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";
import '../pages/Dashboard-Admin/Dashboard-Admin.css'; // Reusing some admin styles for consistency

// Tipagem local (idealmente mover para service)
interface SupplierProduct {
    id: number;
    price: number;
    availableQuantity: number;
    avgDeliveryTimeDays: number;
    product: Product;
}

export default function DashboardSupplier() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [myProducts, setMyProducts] = useState<SupplierProduct[]>([]);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Form
    const [selectedProductUuid, setSelectedProductUuid] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("100");
    const [deliveryDays, setDeliveryDays] = useState("3");

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (!user?.uuid) return;
            // 1. Encontra o fornecedor gerenciado pelo usuário
            const mySuppliers = await getAllSuppliers({ manager_uuid: user.uuid });

            if (mySuppliers && mySuppliers.length > 0) {
                const mySup = mySuppliers[0];
                setSupplier(mySup);

                // 2. Busca detalhes completos (produtos)
                const detailedSup = await getSupplierByUuid(mySup.uuid!);
                if (detailedSup) {
                    // @ts-ignore
                    if (detailedSup.products) setMyProducts(detailedSup.products);
                }
            } else {
                setSupplier(null);
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
        setSelectedProductUuid("");
        setPrice("");
        setQty("100");
        setDeliveryDays("3");
    }

    const handleAddItem = async () => {
        if (!supplier || !selectedProductUuid || !price) return;
        setIsSaving(true);
        try {
            const product = allProducts.find(p => p.uuid === selectedProductUuid);
            if (!product) return;

            await api.post(`/supplier-products/${supplier.uuid}/products`, {
                name: product.name,
                price: parseFloat(price),
                availableQuantity: parseInt(qty),
                avgDeliveryTimeDays: parseInt(deliveryDays)
            });

            alert("Produto ofertado com sucesso!");
            setIsModalOpen(false);
            loadData();
        } catch (e) {
            alert("Erro ao ofertar produto.");
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    }

    const handleRemoveItem = async (id: number) => {
        if (!confirm("Remover esta oferta?")) return;
        try {
            await api.delete(`/supplier-products/product/${id}`);
            loadData();
        } catch (e) {
            alert("Erro ao remover.");
        }
    }

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Oval color="#2BB673" height={60} width={60} /></div>;

    if (!supplier) return (
        <div style={{ padding: 50, textAlign: 'center' }}>
            <h2>Você ainda não tem uma empresa cadastrada.</h2>
            <p>Clique em "Minha Empresa" no menu para cadastrar.</p>
        </div>
    );

    return (
        <>
            
            <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '28px', color: '#333' }}>Painel da Empresa - {supplier.tradeName}</h1>
                    <p style={{ color: '#666' }}>Gerencie seus produtos e preços disponíveis para as ONGs.</p>
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
                        <span style={{ marginRight: '20px' }}>Status: <strong>{supplier.status === 'APPROVED' ? 'Ativo' : supplier.status}</strong></span>
                        <span>CNPJ: {supplier.cnpj}</span>
                    </div>
                </div>

                { supplier.status !== 'APPROVED' ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
                        <h2>Fornecedor não aprovado</h2>
                        <p>Sua empresa ainda não foi aprovada. Aguarde a aprovação para adicionar produtos.</p>
                    </div>
                ) : (
                    <>
                    <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <Card titleSection="Total Ofertado">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <FontAwesomeIcon icon={faBoxOpen} size="2x" color="#2BB673" />
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{myProducts.length} Produtos</div>
                            </div>
                        </Card>
                        <Card titleSection="Acesso Rápido">
                            <Button text="+ Ofertar Novo Produto" onClick={handleOpenModal} variant="primary" style={{ width: '100%' }} />
                        </Card>
                    </div>

                    <Card titleSection="Meus Produtos à Venda" subtitleSection="Estes produtos ficarão visíveis para as ONGs.">
                        {myProducts.length === 0 ? <p style={{ padding: 20, textAlign: 'center', color: '#999' }}>Nenhum produto cadastrado.</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                                <thead>
                                    <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                                        <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Produto</th>
                                        <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Preço Unit.</th>
                                        <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Estoque</th>
                                        <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Entrega</th>
                                        <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProducts.map((item: any) => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: 12 }}>
                                                <div style={{ fontWeight: 'bold' }}>{item.product?.name}</div>
                                                <div style={{ fontSize: '12px', color: '#777' }}>{item.product?.category}</div>
                                            </td>
                                            <td style={{ padding: 12, color: '#2BB673', fontWeight: 'bold' }}>R$ {Number(item.price).toFixed(2)}</td>
                                            <td style={{ padding: 12 }}>{item.availableQuantity}</td>
                                            <td style={{ padding: 12 }}><FontAwesomeIcon icon={faTruckFast} style={{ marginRight: 5, color: '#aaa' }} /> {item.avgDeliveryTimeDays} dias</td>
                                            <td style={{ padding: 12 }}>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    title="Remover Oferta"
                                                    style={{ color: '#d33', border: 'none', background: '#fff', cursor: 'pointer', padding: 5 }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Card>
                    </>
                )}
            </div>

            {isModalOpen && (
                <Modal
                    title="Ofertar Produto"
                    pText="Confirmar Oferta"
                    sText="Cancelar"
                    pEvent={handleAddItem}
                    sEvent={() => setIsModalOpen(false)}
                    xEvent={() => setIsModalOpen(false)}
                    isLoading={isSaving}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Produto do Catálogo</label>
                            <select style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={selectedProductUuid} onChange={e => setSelectedProductUuid(e.target.value)}>
                                <option value="">Selecione um produto...</option>
                                {allProducts.map(p => <option key={p.uuid} value={p.uuid}>{p.name} ({p.category})</option>)}
                            </select>
                            <small style={{ color: '#666' }}>Selecione o item que você vende.</small>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Preço (R$)</label>
                                <input type="number" step="0.01" style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Estoque Atual</label>
                                <input type="number" style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={qty} onChange={e => setQty(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Prazo Médio de Entrega (dias)</label>
                            <input type="number" style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }} value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)} />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
