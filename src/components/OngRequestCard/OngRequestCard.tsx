import './OngRequestCard.css';
import { api, SimplifiedOng, StatusOng } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faEnvelope, faFileLines, faLocationDot, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';


type Props = {
    ongRequest: SimplifiedOng;
    onClickButton: (id: number, status: 'APROVADA' | 'REJEITADA') => void;
}

export default function OngRequestCard(props: Props) {
    const isAdmin = true; // Simulação de verificação de admin
    
    const { ongRequest } = props;

    


    return (
        <div className='card-ongRequest'>
            <h3>{ongRequest.nome_fantasia}</h3>
            <p>{ongRequest.foco_principal}</p>

            <div className='badge'>
                <span>{ongRequest.status}</span>
            </div>

            <div className='container-objective'>
                <p>Objetivo</p>
                <p>{ongRequest.objetivo}</p>
            </div>

            <div className='container-infos'>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{ongRequest.local}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{ongRequest.numero_telefone}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>{ongRequest.email_contato}</span>
                </div>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{ongRequest.criadaEm}</span>
                </div>
            </div>

            <div className='container-actions'>
                <button className='btn-documents' onClick={() => alert('Em Desenvolvimento...')} >
                    <FontAwesomeIcon icon={faFileLines} />
                    Ver Documentação
                </button>

                { ongRequest.status == 'PENDENTE' && (
                    <>
                        <button className='btn-reject' onClick={() => props.onClickButton(ongRequest.id, 'REJEITADA')} >
                            <FontAwesomeIcon icon={faXmark} />
                            Rejeitar
                        </button>

                        <button className='btn-approve' onClick={() => props.onClickButton(ongRequest.id, 'APROVADA')} >
                            <FontAwesomeIcon icon={faCheck} />
                            Aprovar
                        </button>
                    </>
                )}
                
            </div>

        </div>
    )
}