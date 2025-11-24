import { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { Overlay } from "../../Overlay/Overlay";
import Input from "../../Inputs/Input/Input";
import { api, FORM_SCHEMAS } from "../../../services/api"; 
import Button from "../../Button/Button";
import './EntityCreate.css';
import Modal from "../../Modal/Modal";

type Props = {
    onClose: () => void;
    // Adicionei onRefresh opcional, caso queira atualizar a tabela ao fechar
    onRefresh?: () => void; 
};

export default function EntityCreate(props: Props) {
    const [tab, setTab] = useState<'user' | 'ong'>('user');
    const [currentFields, setCurrentFields] = useState(FORM_SCHEMAS[tab]);

    const handleChange = (fieldName: string, value: any) => {
        setCurrentFields((prevFields: any) =>
            prevFields.map((f: any) =>
                f.name === fieldName ? { ...f, value } : f
            )
        );
    };

    // --- LÓGICA RESTAURADA AQUI ---
    const handleSave = async () => {
        // Transforma array de inputs em objeto JSON
        const data = currentFields.reduce((acc: any, field: any) => {
            // Se o input for do tipo number, garante que o JSON envie um número, não string "10"
            acc[field.name] = field.type === 'number' ? Number(field.value) : field.value;
            return acc;
        }, {});

        try {
            let response;

            if (tab === 'user') {
                response = await api.fetchCreateUser(data);
            }

            if (tab === 'ong') {
                response = await api.fetchCreateOng(data);
            }


            if (!response) {
                alert(api.errorResponse); 
                return;
            }

            alert(`${tab === 'user' ? 'Usuário' : 'ONG'} criado(a) com Sucesso!`);
            
            if (props.onRefresh) props.onRefresh(); // Atualiza a tabela pai, se existir
            props.onClose();

        } catch (e: any) {
            console.error(e);
            alert("Erro inesperado na aplicação.");
        }
    }
    // ------------------------------

    useEffect(() => {
        // Reseta os campos quando troca a aba, para não misturar dados de User com ONG
        setCurrentFields(FORM_SCHEMAS[tab]);
    }, [tab]);

    return (
        <Modal
            title='Adicionando Entidade'
            pText="Criar"
            pEvent={handleSave}
            sText="Cancelar"
            sEvent={props.onClose}
            xEvent={props.onClose}
        >

            <form className="form-createEntity">

                <div className="container-tabs">
                    <label className="radio-group" htmlFor="tab-user">
                        <input
                            type="radio"
                            name="tab"
                            id="tab-user"
                            value="user"
                            checked={tab === 'user'}
                            onChange={() => setTab('user')}
                        />
                        Usuário
                    </label>

                    <label className="radio-group" htmlFor="tab-ong">
                        <input
                            type="radio"
                            name="tab"
                            id="tab-ong"
                            value="ong"
                            checked={tab === 'ong'}
                            onChange={() => setTab('ong')}
                        />
                        ONG
                    </label>
                </div>

                <div className="container-body">
                    {currentFields.map((fieldConfigs: any) => (
                        <Input
                            variant="default"
                            key={fieldConfigs.name}
                            type={fieldConfigs.type}
                            label={fieldConfigs.label}
                            value={fieldConfigs.value || ''}
                            placeholder={fieldConfigs.placeholder}
                            onChange={(e: any) => handleChange(fieldConfigs.name, e.target.value)}
                        />
                    ))}
                </div>

            </form>

        </Modal>
    );
}