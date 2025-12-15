import { faMarker, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css'
import { Overlay } from '../Overlay/Overlay';
import Button from '../Button/Button';


import { Oval } from 'react-loader-spinner';

type Props = {
    title: string;
    children?: React.ReactNode;
    pText: string;
    sText: string;
    pEvent: () => void;
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
                        onClick={() => !props.isLoading && props.sEvent()}
                        type='button'
                        style={props.isLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                    />

                    <Button
                        variant='primary'
                        text={props.isLoading ? '' : props.pText}
                        onClick={() => !props.isLoading && props.pEvent()}
                        type='button'
                        style={props.isLoading ? { opacity: 0.8, cursor: 'not-allowed', display: 'flex', justifyContent: 'center', minWidth: '100px' } : {}}
                    >
                        {props.isLoading && (
                            <Oval
                                height={20}
                                width={20}
                                color="#ffffff"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#cccccc"
                                strokeWidth={4}
                                strokeWidthSecondary={4}
                            />
                        )}
                        {!props.isLoading && props.pText}
                    </Button>
                </div>


            </div>
        </Overlay>
    )
}