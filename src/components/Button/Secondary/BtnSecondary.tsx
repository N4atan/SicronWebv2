import './BtnSecondary.css'


type BtnSecondaryProps = {
    type?  : 'submit' | 'reset' | 'button';
    text   : string;
}

export default function BtnSecondary({ type, text }: BtnSecondaryProps) {
    return (
        <button className="btn-secondary" type={ type }>
            { text }
        </button>
    )
}