import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimplifiedUser, api } from '../../../services/api';
import Button from '../../Button/Button';
import Card from "../../Card/Card";
import Input from "../../Inputs/Input/Input";
import { Overlay } from "../../Overlay/Overlay";
import './EntityUpdate.css' // Certifique-se que o arquivo existe
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "../../Modal/Modal";

type Props = {
    entity: any;
    typeEntity: string;
    onClose: () => void;
    onRefresh: () => void;
}

export default function EntityUpdate(props: Props) {
    const [formData, setFormData] = useState(props.entity);

    const handleChange = (field: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleSave = async () => {
        
        console.log('Dados para salvar:', formData);
        const response = await api.fetchUpdateUser(formData);

        if (!response) {
            alert(api.errorResponse);
            return;
        }
        alert('Salvo com Sucesso!');
        props.onClose();
        props.onRefresh();
    }

    const keys: Array<string> = Object.keys(props.entity);
    const filteredKeys = keys.filter(k => k != 'id');

    return (
        <Modal
            title={`Editando ${props.typeEntity}`}
            pText="Salvar"
            sText="Cancelar"
            pEvent={() => handleSave}
            sEvent={props.onClose}
            xEvent={props.onClose}
        >
            <form
                className="form-editEntity"
            >
                
                <div className="container-body">
                    {filteredKeys.map((key, idKey) => (
                        <Input
                            key={idKey}
                            variant="default"
                            label={key}
                            value={(formData as any)[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    ))}
                </div>

                
            </form>
        </Modal>
    )
}