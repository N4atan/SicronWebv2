import './BtnSecondary.css'


type BtnSecondaryProps = React.HTMLAttributes<HTMLButtonElement> & {
    type?  : 'submit' | 'reset' | 'button';
    text   : string;
}

export default function BtnSecondary({ type, text, ...rest }: BtnSecondaryProps) {
    return (
        <button className="btn-secondary" type={ type }>
            { text }
        </button>
    )
}