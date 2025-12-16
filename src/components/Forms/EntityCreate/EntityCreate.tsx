import { useEffect, useState } from "react";
import { Overlay } from "../../Overlay/Overlay";
import Input from "../../Inputs/Input/Input";
import Button from "../../Button/Button";
import './EntityCreate.css';
import Modal from "../../Modal/Modal";
import { ENTITY_SCHEMAS } from "../../../utils/entitySchemas";
import { registerUser, errorUserService } from "../../../services/user.service";
import { registerOng, errorOngService } from "../../../services/ong.service";

type Props = {
    onClose: () => void;
    onRefresh?: () => void;
};

export default function EntityCreate(props: Props) {
    const [tab, setTab] = useState<'user' | 'ong'>('ong');
    // @ts-ignore
    const [currentFields, setCurrentFields] = useState(ENTITY_SCHEMAS[tab]);

    const handleChange = (fieldName: string, value: any) => {
        setCurrentFields((prevFields: any) =>
            prevFields.map((f: any) =>
                f.name === fieldName ? { ...f, value } : f
            )
        );
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        // Transforma array de inputs em objeto JSON
        const data = currentFields.reduce((acc: any, field: any) => {
            acc[field.name] = field.type === 'number' ? Number(field.value) : field.value;
            return acc;
        }, {});

        setIsLoading(true);

        try {
            let response;
            let errorMessage = "";

            if (tab === 'user') {
                response = await registerUser(data);
                errorMessage = errorUserService;
            }

            if (tab === 'ong') {
                response = await registerOng(data);
                errorMessage = errorOngService;
            }


            if (!response) {
                alert(errorMessage || "Erro ao criar entidade.");
                setIsLoading(false);
                return;
            }

            alert(`${tab === 'user' ? 'Usuário' : 'ONG'} criado(a) com Sucesso!`);

            if (props.onRefresh) props.onRefresh();
            props.onClose();
            // Nao precisa false aqui pq vai desmontar

        } catch (e: any) {
            console.error(e);
            alert("Erro inesperado na aplicação.");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Reseta os campos quando troca a aba
        // @ts-ignore
        setCurrentFields(ENTITY_SCHEMAS[tab]);
    }, [tab]);

    return (
        <Modal
            title='Adicionando Entidade'
            pText="Criar"
            pEvent={handleSave}
            sText="Cancelar"
            sEvent={props.onClose}
            xEvent={props.onClose}
            isLoading={isLoading}
        >

            <form className="form-createEntity">

                {/* 
                    NOTE: User creation via Admin is currently blocked by the backend (register endpoint requires unauthenticated state).
                    For now, we only allow creating ONGs.
                */}
                {/* 
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
                */}

                <h3 style={{ marginBottom: '16px', color: '#555' }}>Cadastrar Nova ONG</h3>

                <div className="container-body">
                    {currentFields.map((fieldConfigs: any) => (
                        <Input
                            variant={fieldConfigs.variant || "default"}
                            key={fieldConfigs.name}
                            type={fieldConfigs.type}
                            label={fieldConfigs.label}
                            value={fieldConfigs.value || ''}
                            options={fieldConfigs.options}
                            placeholder={fieldConfigs.placeholder}
                            onChange={(e: any) => handleChange(fieldConfigs.name, e.target.value)}
                        />
                    ))}
                </div>

            </form>

        </Modal>
    );
}