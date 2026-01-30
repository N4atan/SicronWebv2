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
    pEvent?: () => void; // Turn optional since we might use form submit
    pForm?: string; // Add pForm prop
    sEvent: () => void;
    xEvent: () => void;
    isLoading?: boolean;
}

export default function Modal(props: Props) {
    return (
        <Overlay>
            <div className="container-modal">

                <div className="modal-header">
                    <p>{props.title}</p>
                    <FontAwesomeIcon icon={faX} onClick={() => !props.isLoading && props.xEvent()} cursor={props.isLoading ? 'not-allowed' : 'pointer'} />
                </div>


                <div className="modal-body">
                    {props.children}
                </div>


                <div className="modal-footer">
                    <Button
                        variant='secondary'
                        text={props.sText}
                        onClick={props.sEvent}
                        type='button'
                        disabled={props.isLoading}
                    />

                    <Button
                        variant='primary'
                        text={props.pText}
                        onClick={props.pEvent}
                        type={props.pForm ? 'submit' : 'button'}
                        form={props.pForm}
                        disabled={props.isLoading}
                        style={props.isLoading ? { minWidth: '100px', display: 'flex', justifyContent: 'center' } : {}}
                    />
                </div>


            </div>
        </Overlay>
    )
}