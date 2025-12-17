import './Button.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary';
    type?: 'submit' | 'reset' | 'button';
    text: string;
}

export default function Button({ variant, type, text, ...rest }: ButtonProps) {
    return (
        <button
            type={type}
            className={variant === 'primary' ? "btn-primary" : "btn-secondary"}
            {...rest}
        >
            {text}
        </button>
    )
}