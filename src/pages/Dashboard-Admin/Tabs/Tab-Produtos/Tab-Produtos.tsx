import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Inputs/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts, createProduct, deleteProduct } from "../../../../services/product.service";
import { Product } from "../../../../interfaces";
import { Oval } from "react-loader-spinner";

export default function TabProdutos() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterName, setFilterName] = useState("");

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "" });
    const [isSaving, setIsSaving] = useState(false);

    const loadProducts = async () => {
        setIsLoading(true);
        const list = await getAllProducts(filterName); // Backend support filter? Service supports but maybe backend just returns all
        setProducts(list);
        setIsLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []); // Initial load

    // Filter logic client-side if needed or simple trigger
    const handleSearch = () => {
        loadProducts();
    };

    const handleDelete = async (uuid: string) => {
        if (!confirm("Tem certeza que deseja apagar este produto global?")) return;
        const success = await deleteProduct(uuid);
        if (success) loadProducts();
        else alert("Erro ao deletar produto.");
    };

    const handleSave = async () => {
        if (!newProduct.name || !newProduct.category) {
            alert("Preencha nome e categoria.");
            return;
        }
        setIsSaving(true);
        const result = await createProduct({
            ...newProduct,
            uuid: "" // Backend gera
        });

        if (result) {
            alert("Produto criado!");
            setIsModalOpen(false);
            setNewProduct({ name: "", category: "", description: "" });
            loadProducts();
        } else {
            alert("Erro ao criar produto.");
        }
        setIsSaving(false);
    };

    return (
        <Card titleSection="Gestão de Produtos Globais">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <Input
                        label="Buscar Produto"
                        placeholder="Nome..."
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        icon={faMagnifyingGlass}
                    />
                    <div style={{ marginBottom: '15px' }}>
                        <Button variant="secondary" text="Filtrar" onClick={handleSearch} />
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <Button variant="primary" text="+ Novo Produto" onClick={() => setIsModalOpen(true)} />
                </div>
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}><Oval color="#2BB673" height={40} width={40} /></div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Nome</th>
                            <th style={{ padding: '10px' }}>Categoria</th>
                            <th style={{ padding: '10px' }}>Descrição</th>
                            <th style={{ padding: '10px', width: '80px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.uuid} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px', fontWeight: 'bold' }}>{p.name}</td>
                                <td style={{ padding: '10px' }}>{p.category}</td>
                                <td style={{ padding: '10px', color: '#666' }}>{p.description}</td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => handleDelete(p.uuid)}
                                        style={{ border: 'none', background: 'transparent', color: '#d33', cursor: 'pointer' }}
                                        title="Excluir"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Nenhum produto encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <Modal
                    title="Novo Produto Global"
                    pText="Salvar"
                    sText="Cancelar"
                    pEvent={handleSave}
                    sEvent={() => setIsModalOpen(false)}
                    xEvent={() => setIsModalOpen(false)}
                    isLoading={isSaving}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Input
                            label="Nome do Produto"
                            placeholder="Ex: Cesta Básica, Arroz 5kg..."
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontWeight: '500', fontSize: '14px', color: '#555' }}>Categoria</label>
                            <select
                                style={{
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer'
                                }}
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            >
                                <option value="" disabled>Selecione uma categoria...</option>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Higiene">Higiene</option>
                                <option value="Limpeza">Limpeza</option>
                                <option value="Vestuário">Vestuário</option>
                                <option value="Educação">Educação</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Utensílios">Utensílios</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <Input
                            label="Descrição (Opcional)"
                            placeholder="Detalhes do produto..."
                            variant="text-area"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                    </div>
                </Modal>
            )}

        </Card>
    );
}
