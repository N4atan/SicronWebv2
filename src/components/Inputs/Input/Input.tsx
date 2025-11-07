import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.css';

// 1. CORREÇÃO DO TIPO
type InputIconProps = {
    variant: 'default' | 'outline-border' | 'text-area';
    type?: string;
    placeholder?: string;
    label?: string;
    icon?: IconDefinition;
    sizeStyle?: 'default' | 'compact';
    
    // 2. Adicionamos 'value' e 'onChange' explicitamente
    //    Isso torna o componente um "Controlled Component"
    value?: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    // 3. Opcional: Adicionamos outras props comuns
    name?: string;
    disabled?: boolean;
}

// 4. Renomeamos as props para evitar colisão com os atributos HTML
//    (Ex: 'type' da sua prop vs 'type' do input)
const DefaultInput = ({
    variant,
    type: inputType, // Renomeado
    placeholder,
    label,
    icon,
    sizeStyle,
    ...rest // 'value', 'onChange', 'name', 'disabled' virão aqui
}: InputIconProps) => (
    <div className={`container-input ${sizeStyle || 'default'}`}>
    { label &&
        <label>{ label }</label>
    }

    { variant === 'text-area' ? (
        <textarea
            className='text-area-field borders'
            placeholder={placeholder}
            // 5. Agora o 'rest' (com value e onChange) é passado corretamente
            {...rest}
        />
    )
    :
    (
        <div className={`input-icon-container ${variant === 'outline-border' ? 'outline-border' : 'borders'}`}>
        { icon &&
            <FontAwesomeIcon icon={icon!} className='input-icon' />
        }

            <input
                className='input-field'
                type={inputType} // Usando a prop renomeada
                placeholder={placeholder}
                // 5. O 'rest' (com value e onChange) continua sendo passado aqui
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