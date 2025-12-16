import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Inputs/Input/Input";
import { ENTITY_SCHEMAS } from "../utils/entitySchemas";
import { registerOng, errorOngService } from "../services/ong.service";
import { registerSupplier, errorSupplierService } from "../services/supplier.service";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingNgo, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import ContainerPage from "../components/ContainerPage/ContainerPage";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PageSolicitarCadastro() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Identifica o tipo de solicitação: 'ong' ou 'supplier'
    const type = location.state?.type === 'supplier' ? 'supplier' : 'ong';
    const isSupplier = type === 'supplier';

    const [currentFields, setCurrentFields] = useState(() => {
        // @ts-ignore
        const schema = ENTITY_SCHEMAS[type] || ENTITY_SCHEMAS['ong'];
        return schema.map((field: any) => ({ ...field, value: '' }));
    });

    // Atualiza campos se o tipo mudar (ex: navegação interna)
    useEffect(() => {
        // @ts-ignore
        const schema = ENTITY_SCHEMAS[type] || ENTITY_SCHEMAS['ong'];
        setCurrentFields(schema.map((field: any) => ({ ...field, value: '' })));
    }, [type]);

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

        console.log(`Enviando solicitação de ${type}:`, data);

        try {
            let success = false;
            let errorMessage = "";

            if (isSupplier) {
                success = await registerSupplier(data);
                errorMessage = errorSupplierService;
            } else {
                success = await registerOng(data);
                errorMessage = errorOngService;
            }

            if (!success) {
                alert(errorMessage || `Erro desconhecido ao cadastrar ${isSupplier ? 'Fornecedor' : 'ONG'}.`);
                return;
            }

            alert(`Pedido de Cadastro Realizado com Sucesso!`);
            // Redireciona para evitar reenvio ou para dashboard se aprovado auto (mas aqui é solicitação)
            navigate('/perfil-me');
        } catch (e: any) {
            console.error(e);
            alert("Erro inesperado na aplicação.");
        }
    }

    return (
        <>
            <Card
                style={{ maxWidth: '800px', margin: '2rem auto 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
            >
                <div
                    style={{ backgroundColor: '#eee', padding: '10px', borderRadius: '5px' }}
                >
                    <FontAwesomeIcon icon={isSupplier ? faBriefcase : faBuildingNgo} size="2x" color="" />
                </div>

                <p style={{ fontSize: '28px', fontWeight: '500' }}>
                    Solicitar Cadastro de {isSupplier ? 'Fornecedor' : 'ONG'}
                </p>
            </Card>

            <ContainerPage variant='a-left'>
                <aside>
                    <Card titleSection="Orientações">
                        <p>
                            Após o envio, nossa equipe irá revisar as informações e entrar em contato para validar o cadastro da sua {isSupplier ? 'empresa' : 'organização'}.
                            Este processo pode levar até 5 dias úteis.
                        </p>
                    </Card>
                </aside>

                <main>
                    <Card
                        titleSection={`Informações da ${isSupplier ? 'Empresa' : 'Organização'}`}
                        subtitleSection="Todos os campos são obrigatórios."
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {currentFields.map((field: any) => (
                                <Input
                                    key={field.name}
                                    variant={field.variant as 'default' | 'text-area' | 'selection' || (field.type === 'textarea' ? 'text-area' : 'default')}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    value={field.value}
                                    options={field.options}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => handleChange(field.name, e.target.value)}
                                />
                            ))}

                            <Button
                                variant={"primary"}
                                text="Enviar Solicitação"
                                type="button"
                                onClick={() => handleSave()}
                            />
                        </form>
                    </Card>
                </main>
            </ContainerPage>
            <Footer />
        </>
    )
}