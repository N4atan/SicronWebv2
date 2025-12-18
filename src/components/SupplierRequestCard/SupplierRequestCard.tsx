import '../OngRequestCard/OngRequestCard.css'; // Reusing generic styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faLocationDot, faPhone, faXmark, faBuilding, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { Supplier } from '../../interfaces';

type Props = {
    supplierData: Supplier;
    onClickButton?: (uuid: string, status: 'APPROVED' | 'REJECTED') => void;
    variant?: 'admin' | 'public';
}

export default function SupplierRequestCard(props: Props) {
    const { supplierData, variant = 'public' } = props;

    // Helper para traduzir status
    const getStatusLabel = (status: string | undefined) => {
        if (!status) return 'Pendente';
        switch (status.toUpperCase()) {
            case 'APPROVED': return 'Aprovado';
            case 'REJECTED': return 'Rejeitado';
            case 'PENDING': return 'Pendente';
            default: return status;
        }
    };

    // Helper para classe CSS do badge
    const getStatusClass = (status: string | undefined) => {
        if (!status) return 'badge-pendente';
        switch (status.toUpperCase()) {
            case 'APPROVED': return 'badge-aprovada';
            case 'REJECTED': return 'badge-rejeitada';
            default: return 'badge-pendente';
        }
    };

    return (
        <div className='card-ongRequest'>
            <h3>{supplierData.tradeName || supplierData.companyName}</h3>
            <p style={{ fontStyle: 'italic' }}>{supplierData.companyName}</p>


            {variant !== 'public' && (
                <div className={`badge ${getStatusClass(supplierData.status)}`}>
                    <span>{getStatusLabel(supplierData.status)}</span>
                </div>
            )}

            <div className='container-infos'>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>CNPJ: {supplierData.cnpj}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{supplierData.city ? `${supplierData.city} - ${supplierData.state}` : 'Local não informado'}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{supplierData.phone || 'Sem telefone'}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>{supplierData.contactEmail || 'Sem email'}</span>
                </div>

            </div>

            <div className='container-actions'>
                {variant === 'admin' && (
                    <>

                        <button className='btn-documents' onClick={() => alert('Em Desenvolvimento...')} >
                            <FontAwesomeIcon icon={faFileLines} />
                            Ver Documentação
                        </button>

                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button className='btn-reject' onClick={() => {
                                console.log('Rejeitando:', supplierData.uuid);
                                props.onClickButton?.(supplierData.uuid || '', 'REJECTED');
                            }} >
                                <FontAwesomeIcon icon={faXmark} />
                                Rejeitar
                            </button>

                            <button className='btn-approve' onClick={() => {
                                console.log('Aprovando:', supplierData.uuid);
                                props.onClickButton?.(supplierData.uuid || '', 'APPROVED');
                            }} >
                                <FontAwesomeIcon icon={faCheck} />
                                Aprovar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
