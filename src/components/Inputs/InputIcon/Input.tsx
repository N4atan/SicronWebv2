
import { IconDefinition, icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.css';


type InputIconProps = {
    variant      : 'default' | 'no-border' | 'text-area';
    type?        : string;
    placeholder? : string;
    label?       : string;
}





export default function Input(props: InputIconProps) {
    return (
        <div className='container-input'>
        { props.label && 
            <label>{ props.label }</label> 
        }
            <input
            className='input-field' 
            type={ props.type } 
            placeholder={ props.placeholder }
            />
        </div>
    )
}