import './Button.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary' | 'ghost';
    type?: 'submit' | 'reset' | 'button';
    text: string;
}

export default function Button({ variant, type, text, ...rest }: ButtonProps) {
    return (
        <button
            type={type}
            className={`${variant === 'primary' ? "btn-primary" : variant === 'secondary' ? "btn-secondary" : "btn-ghost"} ${rest.className || ''}`}
            {...rest}
        >
            {text}
        </button>
    )
} 
