import { useEffect, useState, useMemo } from "react";
import Card from "../../../components/Card/Card";
import { Product, Supplier, NGO } from "../../../interfaces";
import { getAllProducts } from "../../../services/product.service";
import OfferCard from "../../../components/OfferCard/OfferCard";
import Input from "../../../components/Inputs/Input/Input";
import { Oval } from "react-loader-spinner";
import Button from "../../../components/Button/Button";
import EntityModal from "../../../components/Forms/Entity/EntityModal";

interface Offer {
    product: Product;
    supplierProduct: any; // SupplierProduct Interface
}

export default function SuppliersTab({ ngo }: { ngo?: NGO }) {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [filterProduct, setFilterProduct] = useState("");
    const [filterSupplier, setFilterSupplier] = useState("");
    const [filterLocal, setFilterLocal] = useState("");

    // Modal
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const products = await getAllProducts();

            // Flatten: Product -> SupplierProducts -> Offers
            const flatOffers: Offer[] = [];
            products.forEach(p => {
                if (p.supplierProducts && p.supplierProducts.length > 0) {
                    p.supplierProducts.forEach((sp: any) => {
                        flatOffers.push({
                            product: p,
                            supplierProduct: sp
                        })
                    });
                }
            });

            setOffers(flatOffers);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredOffers = useMemo(() => {
        return offers.filter(offer => {
            const pName = offer.product.name.toLowerCase();
            const sName = (offer.supplierProduct.supplier?.trade_name || "").toLowerCase();
            const sLocal = (offer.supplierProduct.supplier?.local || "").toLowerCase();

            return (
                pName.includes(filterProduct.toLowerCase()) &&
                sName.includes(filterSupplier.toLowerCase()) &&
                sLocal.includes(filterLocal.toLowerCase())
            );
        })
    }, [offers, filterProduct, filterSupplier, filterLocal]);

    const handleSelectOffer = (offer: Offer) => {
        setSelectedOffer(offer);
        setModalVisible(true);
    };

    const handleSuccessCreate = () => {
        setModalVisible(false);
        setSelectedOffer(null);
        alert("Necessidade criada e estoque reservado com sucesso!");
        loadData(); // Defines refresh to update stocks
    };

    if (isLoading) {
        return (
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <Oval color="#2BB673" height={60} width={60} />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card titleSection="Ofertas Disponíveis" subtitleSection="Explore ofertas de fornecedores parceiros e reserve itens para sua doação.">

                {/* Filters Bar */}
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <Input
                            placeholder="Buscar por Produto..."
                            value={filterProduct}
                            onChange={(e) => setFilterProduct(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <Input
                            placeholder="Fornecedor..."
                            value={filterSupplier}
                            onChange={(e) => setFilterSupplier(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <Input
                            placeholder="Local/Região..."
                            value={filterLocal}
                            onChange={(e) => setFilterLocal(e.target.value)}
                        />
                    </div>
                </div>

                {/* Offers List */}
                {filteredOffers.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhuma oferta encontrada com estes filtros.</p>
                ) : (
                    filteredOffers.map((offer, idx) => (
                        <OfferCard
                            key={`${offer.product.id}-${offer.supplierProduct.id}-${idx}`}
                            offer={offer}
                            onSelect={() => handleSelectOffer(offer)}
                        />
                    ))
                )}
            </Card>

            {modalVisible && selectedOffer && ngo && (
                <EntityModal
                    title="Adicionar Necessidade"
                    typeEntity="ngoProduct"
                    parentUuid={ngo.uuid!}
                    availableOptions={[selectedOffer.product]} // Just to pass validation or lookup if needed
                    // Trick: Pre-fill the 'name' field with the Composite Key "Name::ID" so ProductForm automagically handles it
                    entity={{
                        name: `${selectedOffer.product.name}::${selectedOffer.supplierProduct.id}`
                    } as any}
                    onRefresh={() => handleSuccessCreate()}
                    onClose={() => setModalVisible(false)}
                />
            )}
        </div>
    );
}