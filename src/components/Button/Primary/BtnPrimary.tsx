import './BtnPrimary.css'

type BtnPrimaryProps = {
    type? : 'submit' | 'reset' | 'button';
    text  : string;
}

export default function BtnPrimary ({ type, text }: BtnPrimaryProps) {
    return (
        <button type={type} className="btn-primary">
            { text }
        </button>
    )
}