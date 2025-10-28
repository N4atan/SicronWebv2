
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.css';


type InputIconProps = React.HTMLAttributes<HTMLInputElement> & {
    variant      : 'default' | 'outline-border' | 'text-area';
    type?        : string;
    placeholder? : string;
    label?       : string;
    icon?        : IconDefinition;
    sizeStyle?   : 'default' | 'compact';
}



const DefaultInput = ({ variant, type, placeholder, label, icon, sizeStyle, ...rest }: InputIconProps) => (
    <div className={`container-input ${sizeStyle || 'default'}`}>
    { label &&
        <label>{ label }</label>
    }

    { variant === 'text-area' ? (
        <textarea
        className='text-area-field borders'
        placeholder={placeholder}
        />
    )
    :
    (
        <div className={`input-icon-container ${variant === 'outline-border' ? 'outline-border' : 'borders'}`}>
        { icon &&
            <FontAwesomeIcon icon={icon!} className='input-icon' />
        }

            <input
            className   = 'input-field'
            type        = { type }
            placeholder = { placeholder }
            {...rest}
            />

        </div>
    )}
    </div>
);



export default function Input(props: InputIconProps) {
    return (
        <DefaultInput {...props} />
    )
}