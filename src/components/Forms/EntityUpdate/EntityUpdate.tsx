import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimplifiedUser, api } from '../../../services/api';
import Button from '../../Button/Button';
import Card from "../../Card/Card";
import Input from "../../Inputs/Input/Input";
import { Overlay } from "../../Overlay/Overlay";
import './EntityUpdate.css'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";



type Props = {
    entity: any;
    typeEntity: string;
    onClose: () => void;
    onRefresh: () => void;
}



export default function EntityUpdate(props: Props) {
    const [ formData, setFormData ] = useState(props.entity);
    
    

    const handleChange = (field: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Dados para salvar:');
        console.table(formData);

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
        <Overlay>
            <Card
                titleSection={`Editando Entidade`}
                subtitleSection={`${props.typeEntity} de id: ${props.entity? props.entity.id : '-'}`}
                style={{width: '500px', margin: '25px auto'}}
            >
                <form
                    className="form-editEntity"
                    onSubmit={(e) => handleSubmit(e)}
                >

                    { filteredKeys.map((key, idKey) => (
                        <Input
                            key={idKey} 
                            variant="default"
                            label={key}
                            value={(formData as any)[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    ))}
                    
                    <div className="container-buttons">
                        <Button 
                            variant="secondary"
                            text="Cancelar"
                            type="button"
                            onClick={()=>props.onClose()}
                        />

                        <Button 
                            variant="primary"
                            text="Salvar"
                            type="submit"
                        />
                    </div>
                </form>
            </Card>
            
        </Overlay>
    )
}