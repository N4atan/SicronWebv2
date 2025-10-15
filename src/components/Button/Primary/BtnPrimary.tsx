import './BtnPrimary.css'

type BtnPrimaryProps = React.HTMLAttributes<HTMLButtonElement> & {
    type? : 'submit' | 'reset' | 'button';
    text  : string;
}

export default function BtnPrimary ({ type, text, ...rest }: BtnPrimaryProps) {
    return (
        <button type={type} className="btn-primary">
            { text }
        </button>
    )
}