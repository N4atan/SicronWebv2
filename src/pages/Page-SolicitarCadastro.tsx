import { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/Inputs/Input/Input";
import { FORM_SCHEMAS, api } from "../services/api";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingNgo } from "@fortawesome/free-solid-svg-icons";
import "./Page-SolicitarCadastro.css";

export default function PageSolicitarCadastro() {
    const [currentFields, setCurrentFields] = useState(FORM_SCHEMAS['ong']);

    const handleChange = (fieldName: string, value: any) => {
        setCurrentFields((prevFields: any) =>
            prevFields.map((f: any) =>
                f.name === fieldName ? { ...f, value } : f
            )
        );
    };

    const handleSave = async () => {
        const data = currentFields.reduce((acc: any, field: any) => {
            acc[field.name] = field.type === 'number' ? Number(field.value) : field.value;
            return acc;
        }, {});

        try {
            let response = await api.fetchCreateOng(data);

            if (!response) {
                alert(api.errorResponse);
                return;
            }

            alert(`Pedido Realizado!`);
        } catch (e: any) {
            console.error(e);
            alert("Erro inesperado na aplicação.");
        }
    }

    return (
        <div className="register-page-wrapper">
            <Header />

            <div className="register-content">
                <div className="register-container">

                    {/* Header of Form */}
                    <div className="register-header">
                        <div className="register-icon-circle">
                            <FontAwesomeIcon icon={faBuildingNgo} size="2x" />
                        </div>
                        <h1 className="register-title">Solicitar Cadastro de ONG</h1>
                        <p className="register-subtitle">Preencha os dados da sua organização para iniciar o processo de verificação.</p>
                    </div>

                    {/* Info Card / Warning */}
                    <div className="register-info-card">
                        <h3>Orientações Importantes</h3>
                        <p>Após o envio, nossa equipe irá revisar as informações e entrar em contato para validar o cadastro da sua ONG. Este processo pode levar até 5 dias úteis.</p>
                    </div>

                    {/* Main Form */}
                    <form className="register-form">
                        <div className="form-grid">
                            {currentFields.map((field: any) => (
                                <div key={field.name} className={`form-group ${field.type === 'textarea' ? 'full-width' : ''}`}>
                                    <Input
                                        variant={field.type === 'textarea' ? 'text-area' : 'default'}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        value={field.value}
                                        onChange={(e: any) => handleChange(field.name, e.target.value)}
                                        styleDefault="outline-border" // Ensure clean style
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="form-actions">
                            <Button
                                variant={"primary"}
                                text="Enviar Solicitação"
                                type="button"
                                onClick={() => handleSave()}
                                style={{ width: '100%', maxWidth: '300px' }}
                            />
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}