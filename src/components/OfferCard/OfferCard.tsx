import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../../interfaces";
import './OfferCard.css';

interface OfferCardProps {
    offer: {
        product: Product;
        supplierProduct: any; // Using any for flexibility or we can define SupplierProduct interface
    };
    onSelect: () => void;
}

export default function OfferCard({ offer, onSelect }: OfferCardProps) {
    const { product, supplierProduct } = offer;
    const supplier = supplierProduct.supplier;

    return (
        <div className="offer-card">
            <div className="offer-info-left">
                <h3 className="product-name">{product.name}</h3>
                <h4 className="supplier-name">{supplier?.trade_name || supplier?.name || "Fornecedor Desconhecido"}</h4>
                <p className="supplier-local">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" />
                    {supplier?.local || "Localização não informada"}
                </p>
            </div>

            <div className="offer-info-center">
                <span className="offer-price-label">Valor Unitário</span>
                <span className="offer-price-value">
                    R$ {Number(supplierProduct.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="offer-stock">Disp: {supplierProduct.availableQuantity} un.</span>
            </div>

            <div className="offer-action-right">
                <button className="btn-select-offer" onClick={onSelect}>
                    Selecionar
                </button>
            </div>
        </div>
    )
}
