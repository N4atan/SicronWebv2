import './OngRequestCard.css';
import { SimplifiedOng, StatusOng } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faEnvelope, faFileLines, faLocationDot, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';


type Props = {
    ongRequest: SimplifiedOng;
}

export default function OngRequestCard(props: Props) {
    const { ongRequest } = props;

    return (
        <div className='card-ongRequest'>
            <h3>{ongRequest.nome_fantasia}</h3>
            <p>!!Área de Atuação</p>

            <div className='badge'>
                <span>{'STATUS'}</span>
            </div>

            <div className='container-objective'>
                <p>Objetivo</p>
                <p>!!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores optio voluptatem est sed debitis facere temporibus aperiam accusantium aliquid sit, accusamus earum reprehenderit? Ducimus enim quibusdam dolore beatae minus sit?</p>
            </div>

            <div className='container-infos'>

                <div className='row-info'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{ongRequest.cep_location}</span>
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
                    <span>Data do Registro</span>
                </div>
            </div>

            <div className='container-actions'>
                <button className='btn-documents' >
                    <FontAwesomeIcon icon={faFileLines} />
                    Ver Documentação
                </button>

                
            
                <button className='btn-reject' >
                    <FontAwesomeIcon icon={faXmark} />
                    Rejeitar
                </button>

                <button className='btn-approve' >
                    <FontAwesomeIcon icon={faCheck} />
                    Aprovar
                </button>
                
            </div>

        </div>
    )
}