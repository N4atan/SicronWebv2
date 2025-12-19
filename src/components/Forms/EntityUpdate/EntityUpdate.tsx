import './EntityUpdate.css'
import Input from "../../Inputs/Input/Input";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import { ENTITY_SCHEMAS } from "../../../utils/entitySchemas";
import { updateUser, errorUserService } from "../../../services/user.service";
import { updateOng, errorOngService } from "../../../services/ong.service";
import { updateSupplier, errorSupplierService } from "../../../services/supplier.service";

type Props = {
    entity: any; // User or NGO
    typeEntity: 'user' | 'ong' | 'user_profile' | 'supplier' | 'product';
    onClose: () => void;
    onRefresh: () => void;
}

export default function EntityUpdate(props: Props) {
    const [formData, setFormData] = useState(props.entity);

    const fields = ENTITY_SCHEMAS[props.typeEntity] || [];

    const handleChange = (field: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [field]: value
        }))
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        const identifier = formData.uuid || formData.id;

        console.log("EntityUpdate - handleSave - Identifier:", identifier);
        console.log("EntityUpdate - handleSave - FormData:", formData);

        if (!identifier) {
            alert("ID não encontrado para atualização");
            return;
        }

        setIsLoading(true);

        try {
            let success = false;
            let errorMessage = "";

            // Filtra apenas os dados que estão no Schema para enviar (evita enviar dados readonly ou lixo)
            const cleanData: any = {};
            fields.forEach((f: any) => {
                if (formData[f.name] !== undefined) {
                    cleanData[f.name] = formData[f.name];
                }
            });

            if (props.typeEntity === 'user' || props.typeEntity === 'user_profile') {
                success = await updateUser(identifier, cleanData);
                errorMessage = errorUserService;
            } else if (props.typeEntity === 'ong') {
                success = await updateOng(identifier, cleanData);
                errorMessage = errorOngService;
            } else if (props.typeEntity === 'supplier') {
                success = await updateSupplier(identifier, cleanData);
                errorMessage = errorSupplierService;
            } else if (props.typeEntity === 'product') {
                console.warn("Update product yet not implemented in service");
                alert("Edição de produtos ainda não está disponível.");
                setIsLoading(false);
                return;
            }

            if (!success) {
                alert(errorMessage || 'Erro ao atualizar.');
                setIsLoading(false);
                return;
            }

            alert('Salvo com Sucesso!');
            props.onRefresh();
            props.onClose();

        } catch (error) {
            console.error(error);
            alert("Erro inesperado ao salvar.");
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title={`Editando ${props.typeEntity === 'user' ? 'Usuário' : 'ONG'}`}
            pText="Salvar"
            sText="Cancelar"
            pEvent={handleSave}
            sEvent={props.onClose}
            xEvent={props.onClose}
            isLoading={isLoading}
        >
            <form className="form-editEntity">

                <div className="container-body">
                    {/* Renderiza campos baseado no Schema, mas preenche com dados da entidade */}
                    {fields.map((fieldConfig: any) => (
                        <Input
                            key={fieldConfig.name}
                            variant={fieldConfig.variant || "default"}
                            label={fieldConfig.label}
                            type={fieldConfig.type}
                            options={fieldConfig.options}
                            placeholder={fieldConfig.placeholder}
                            value={formData[fieldConfig.name] || ''}
                            onChange={(e) => handleChange(fieldConfig.name, e.target.value)}
                        />
                    ))}
                </div>

            </form>
        </Modal>
    )
}