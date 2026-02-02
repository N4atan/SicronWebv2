import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faMoneyBill, faMoneyBill1Wave, faWallet } from "@fortawesome/free-solid-svg-icons";
import { NGO } from "../../../interfaces";

interface HomeTabProps {
    ngo: NGO;
    availableProductsCount: number;
    onAddClick: () => void;
}

export default function HomeTab({ ngo, availableProductsCount, onAddClick }: HomeTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '28px', color: '#333' }}>Painel da ONG - {ngo.trade_name || ngo.name}</h1>
                <p style={{ color: '#666' }}>Gerencie as necessidades de doação da sua organização.</p>
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
                    <span style={{ marginRight: '20px' }}>Status: <strong>{ngo.status?.toLowerCase() === 'approved' ? 'Aprovada' : ngo.status}</strong></span>
                    <span>CNPJ: {ngo.cnpj}</span>
                </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {/* Saldo */}
                <Card titleSection="Saldo Atual">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <FontAwesomeIcon icon={faWallet} size="2x" color="#2bb673" />
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>R$ {ngo.wallet}</div>
                    </div>
                </Card>
                
                {/* Campanhas Abertas */}
                <Card titleSection="Campanhas Abertas">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <FontAwesomeIcon icon={faHandHoldingHeart} size="2x" color="#2bb673" />
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{ngo.products?.length || 0} Itens</div>
                    </div>
                </Card>

                {/* Acesso rápido */}
                <Card titleSection="Acesso Rápido">
                    <Button
                        text="+ Adicionar Necessidade"
                        onClick={onAddClick}
                        variant="primary"
                        style={{ width: '100%' }}
                    />
                </Card>
            </div>
        </div>
    );
}
