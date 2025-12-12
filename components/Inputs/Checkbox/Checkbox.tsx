import './Checkbox.css';


type CheckboxProps = {
    id: string
    text: string;
}

export const Checkbox = ({ id, text }: CheckboxProps) => (
    <div className="checkbox-group">
        <input type="checkbox" id={ id } />
        <label htmlFor={ id }>
            { text }
        </label>
    </div>
)