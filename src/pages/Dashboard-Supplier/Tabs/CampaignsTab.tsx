import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { NGOProduct, Supplier } from "../../../interfaces";
import { getPartnerCampaigns } from "../../../services/product.service";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faBox, faChartPie, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

interface CampaignsTabProps {
    supplier: Supplier;
}

export default function CampaignsTab({ supplier }: CampaignsTabProps) {
    const [campaigns, setCampaigns] = useState<NGOProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (supplier.uuid) {
                const list = await getPartnerCampaigns(supplier.uuid);
                setCampaigns(list);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [supplier]);

    if (isLoading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <Oval color="#2BB673" height={50} width={50} />
        </div>
    )

    return (
        <div style={{ padding: 20 }}>
            <Card titleSection="Campanhas Parceiras" subtitleSection="Acompanhe as campanhas de ONGs que escolheram seus produtos.">
                {campaigns.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888', padding: 20 }}>Nenhuma campanha ativa com seus produtos no momento.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {campaigns.map(camp => (
                            <div key={camp.id} style={{
                                background: '#fff',
                                borderRadius: '12px',
                                padding: '20px',
                                border: '1px solid #eee',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>
                                            <FontAwesomeIcon icon={faBox} style={{ marginRight: 8, color: '#2bb673' }} />
                                            {camp.product.name}
                                        </h3>
                                        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
                                            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 6 }} />
                                            {camp.ngo?.trade_name || camp.ngo?.name}
                                        </p>
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        background: camp.active ? '#e6f9ed' : '#f0f0f0',
                                        color: camp.active ? '#2bb673' : '#999',
                                        fontWeight: 'bold'
                                    }}>
                                        {camp.active ? 'EM ANDAMENTO' : 'ENCERRADA'}
                                    </span>
                                </div>

                                <div style={{ height: '1px', background: '#f0f0f0', margin: '5px 0' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>Solicitado</span>
                                        <strong style={{ fontSize: '1.1rem', color: '#333' }}>{camp.quantity}</strong>
                                    </div>
                                    <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px solid #eee' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>Arrecadado</span>
                                        <strong style={{ fontSize: '1.1rem', color: '#2bb673' }}>{camp.collected_quantity || 0}</strong>
                                    </div>
                                </div>

                                <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', color: '#555', marginTop: '5px' }}>
                                    <strong>Status:</strong> {camp.collected_quantity >= camp.quantity ?
                                        <span style={{ color: '#2bb673' }}> <FontAwesomeIcon icon={faCheckCircle} /> Meta Atingida!</span> :
                                        <span style={{ color: '#f2c94c' }}> <FontAwesomeIcon icon={faClock} /> Aguardando Doações</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    )
}
