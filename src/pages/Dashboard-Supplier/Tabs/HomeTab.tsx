import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Supplier } from "../../../interfaces";

interface HomeTabProps {
    supplier: Supplier;
    onAddClick: () => void;
}

export default function HomeTab({ supplier, onAddClick }: HomeTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '28px', color: '#333' }}>Painel do Fornecedor - {supplier.tradeName || supplier.companyName}</h1>
                <p style={{ color: '#666' }}>Gerencie suas ofertas e vendas.</p>
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
                    <span style={{ marginRight: '20px' }}>Status: <strong>{supplier.status?.toLowerCase() === 'approved' ? 'Aprovada' : supplier.status}</strong></span>
                    <span>CNPJ: {supplier.cnpj}</span>
                </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <Card titleSection="Ofertas Ativas">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <FontAwesomeIcon icon={faBoxOpen} size="2x" color="#2bb673" />
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{supplier.products?.length || 0} Ofertas</div>
                    </div>
                </Card>
                <Card titleSection="Acesso Rápido">
                    <Button
                        text="+ Nova Oferta"
                        onClick={onAddClick}
                        variant="primary"
                        style={{ width: '100%' }}
                    />
                </Card>
            </div>
        </div>
    );
}
