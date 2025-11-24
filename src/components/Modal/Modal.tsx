import { faMarker, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css'
import { Overlay } from '../Overlay/Overlay';
import Button from '../Button/Button';


type Props = {
    title: string;
    children?: React.ReactNode;
    pText: string;
    sText: string;
    pEvent: () => void;
    sEvent: () => void;
    xEvent: () => void;
}

export default function Modal(props: Props) {
    return (
        <Overlay>
            <div className="container-modal">

                <div className="modal-header">
                    <p>{props.title}</p>
                    <FontAwesomeIcon icon={faX} onClick={() => props.xEvent()} cursor={'pointer'}/>
                </div>


                <div className="modal-body">
                    {props.children}
                </div>


                <div className="modal-footer">
                    <Button 
                        variant='secondary'
                        text={props.sText}
                        onClick={() => props.sEvent()}
                        type='button'
                    />

                    <Button 
                        variant='primary' 
                        text={props.pText}
                        onClick={() => props.pEvent()}
                        type='button'
                    />
                </div>


            </div>
        </Overlay>
    )
}