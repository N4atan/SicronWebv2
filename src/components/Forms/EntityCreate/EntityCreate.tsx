import { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { Overlay } from "../../Overlay/Overlay";
import Input from "../../Inputs/Input/Input";
import { api, FORM_SCHEMAS, SimplifiedOng } from "../../../services/api"; // Ajuste o import conforme seu projeto
import Button from "../../Button/Button";
import './EntityCreate.css';

type Props = {
    onClose: () => void;
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


    const handleSave = async () => {
        const data = currentFields.reduce((acc: any, field: any) => {
            acc[field.name] = field.value;
            return acc;
        }, {})

        try {
            let response;
            
            if (tab == 'user') {

            }

            if (tab == 'ong') {
                response = await api.fetchCreateOng(data);
            }

            if(!response) {
                console.info(api.errorResponse);
                alert(api.errorResponse);
            }

            alert(`${tab} Salvo(a) com Sucesso(a)!`);
            
        } catch(e: unknown) {
            console.error(e);
            alert(e);
        } finally {

        }
    }



    useEffect(() => {
        // Quando troca a tab, reseta os campos baseados no schema original
        setCurrentFields(FORM_SCHEMAS[tab]);
    }, [tab]);

    return (
        <Overlay>
            <Card
                titleSection="Criando Entidade"
                subtitleSection="Selecione o tipo e preencha os campos."
                style={{ width: '500px', height: '600px', margin: '15px auto' }} 
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
                                value={fieldConfigs.value || ''} // Garante que não seja undefined
                                onChange={(e: any) => handleChange(fieldConfigs.name, e.target.value)}
                            />
                        ))}
                    </div>


                    <div className="container-buttons">
                        <Button
                            variant="secondary"
                            text="Cancelar"
                            type="button"
                            onClick={props.onClose}
                            style={{ width: '80px' }} // Opcional: Largura fixa no botão
                        />

                        <Button
                            variant="primary"
                            text="Criar"
                            type="button"
                            onClick={() => handleSave()}
                            style={{ width: '120px' }} // Opcional: Largura fixa no botão
                        />
                    </div>

                </form>
            </Card>
        </Overlay>
    );
}