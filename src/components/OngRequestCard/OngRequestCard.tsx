import './OngRequestCard.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faEnvelope, faFileLines, faLocationDot, faPhone, faXmark, faBuilding, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NGO } from '../../services/ong.service';


type Props = {
    ongRequest: NGO;
    onClickButton?: (uuid: string, status: 'approved' | 'rejected') => void;
    variant?: 'admin' | 'public';
}

export default function OngRequestCard(props: Props) {
    const { ongRequest, variant = 'public' } = props;
    const navigate = useNavigate();

    // Helper para traduzir status
    const getStatusLabel = (status: string | undefined) => {
        if (!status) return 'Pendente';
        switch (status) {
            case 'approved': return 'Aprovada';
            case 'rejected': return 'Rejeitada';
            case 'pending': return 'Pendente';
            default: return status;
        }
    };

    // Helper para classe CSS do badge
    const getStatusClass = (status: string | undefined) => {
        if (!status) return 'badge-pendente';
        switch (status) {
            case 'approved': return 'badge-aprovada';
            case 'rejected': return 'badge-rejeitada';
            default: return 'badge-pendente';
        }
    };

    return (
        <div className='card-ongRequest'>
            <h3>{ongRequest.trade_name || ongRequest.name}</h3>
            <p style={{ fontStyle: 'italic' }}>{ongRequest.area}</p>

            {/* Só exibe o status se NÃO for público (ou seja, se for admin ou visualização privada) */}
            {variant !== 'public' && (
                <div className={`badge ${getStatusClass(ongRequest.status)}`}>
                    <span>{getStatusLabel(ongRequest.status)}</span>
                </div>
            )}

            <div className='container-objective'>
                <p>Descrição</p>
                <p>{ongRequest.description}</p>
            </div>

            <div className='container-infos'>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>CNPJ: {ongRequest.cnpj}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{ongRequest.local || 'Local não informado'}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{ongRequest.phone_number || 'Sem telefone'}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>{ongRequest.contact_email || 'Sem email'}</span>
                </div>


            </div>

            <div className='container-actions'>
                {variant === 'public' && (
                    <button
                        className='btn-documents'
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => {
                            const nameParam = encodeURIComponent(ongRequest.trade_name || ongRequest.name);
                            navigate(`/perfil-ong?nome=${nameParam}`);
                        }}
                    >
                        {/* Ícone alterado para lupa (Magnifying Glass) ou Seta direita (ArrowRight) conforme preferência */}
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        Ver Detalhes
                    </button>
                )}

                {variant === 'admin' && (
                    <>
                        <button className='btn-documents' onClick={() => alert('Em Desenvolvimento... (Visualizar Docs)')} >
                            <FontAwesomeIcon icon={faFileLines} />
                            Ver Documentação
                        </button>

                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button className='btn-reject' onClick={() => props.onClickButton?.(ongRequest.uuid || '', 'rejected')} >
                                <FontAwesomeIcon icon={faXmark} />
                                Rejeitar
                            </button>

                            <button className='btn-approve' onClick={() => props.onClickButton?.(ongRequest.uuid || '', 'approved')} >
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