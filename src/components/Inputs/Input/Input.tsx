import React from 'react'; // Importante para os tipos
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.css';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    variant?: 'default' | 'text-area' | 'selection';
    styleDefault?: 'default' | 'outline-border';
    label?: string;
    icon?: IconDefinition;
    sizeStyle?: 'default' | 'compact';
    options?: string[];
}


const SelectionInput = ({ options, ...rest }: InputProps) => (
    <select
        className='select-field borders'
        {...rest} // Aqui entram onChange, value, name, etc.
    >
        
        {options?.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ))}
    </select>
)


const TextArea = (props: InputProps) => (
    <textarea
        className='text-area-field borders'
        {...props} 
    />
);

// 4. DEFAULT INPUT
const DefaultInputField = ({ styleDefault, icon, ...rest }: InputProps) => (
    <div className={`input-icon-container ${styleDefault === 'outline-border' ? 'outline-border' : 'borders'}`}>
        {icon && <FontAwesomeIcon icon={icon} className='input-icon' />}

        <input
            className='input-field'
            {...rest} 
        />
    </div>
)

// 5. COMPONENTE PRINCIPAL
export default function Input({ label, sizeStyle, variant, ...rest }: InputProps) {


    return (
        <div className={`container-input ${sizeStyle || 'default'}`}>
            {label && (
                <label>{label}</label>
            )}

            {(() => {
                switch (variant) {
                    case 'text-area':
                        return <TextArea {...rest} />;

                    case 'selection':
                        return <SelectionInput {...rest} />;
                    // O 'options' está dentro de 'rest' aqui, então vai funcionar

                    case 'default':
                    default: 
                        return <DefaultInputField {...rest} />;
                }
            })()}
        </div>
    );
}