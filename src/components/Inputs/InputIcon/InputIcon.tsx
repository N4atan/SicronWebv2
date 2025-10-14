
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './InputIcon.css';


type InputIconProps = {
    type         : string;
    placeholder? : string;
    iconName     : IconDefinition;
}


export const InputIcon = ({ type, placeholder, iconName }: InputIconProps) => (
    <div className="input-group">
        <input type={type}  placeholder={placeholder} />
        <FontAwesomeIcon icon={iconName} className='icon'/>
    </div>
)