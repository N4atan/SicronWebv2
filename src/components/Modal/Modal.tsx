import { faMarker, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css'

type Props = {
    title: string;
    isOpen: boolean;
}

export default function Modal(props: Props) {
    return (
        <div className="container-modal">

            <div className="modal-header">
                <p>{props.title}</p>
                <FontAwesomeIcon icon={faX} />
            </div>


            <div className="modal-body"></div>


            <div className="modal-footer">
            </div>


        </div>
    )
}