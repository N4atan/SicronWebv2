import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Input from "../components/Inputs/Input/Input";
import { FORM_SCHEMAS, api } from "../services/api";
import { registerOng, errorOngService } from "../services/ong.service";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingNgo } from "@fortawesome/free-solid-svg-icons";
import ContainerPage from "../components/ContainerPage/ContainerPage";


import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PageSolicitarCadastro() {
    const location = useLocation();
    const { user } = useAuth(); // Fallback seguro
    const preFilledEmail = location.state?.email || user?.email; // Prioriza state, senão pega do auth

    const [currentFields, setCurrentFields] = useState(FORM_SCHEMAS['ong']);

    // Atualiza o campo gestor_email assim que tivermos o email (seja do state ou do user context)
    useEffect(() => {
        if (preFilledEmail) {
            setCurrentFields(prev => prev.map(f =>
                f.name === 'gestor_email' ? { ...f, value: preFilledEmail } : f
            ));
        }
    }, [preFilledEmail]);

    const handleChange = (fieldName: string, value: any) => {
        setCurrentFields((prevFields: any) =>
            prevFields.map((f: any) =>
                f.name === fieldName ? { ...f, value } : f
            )
        );
    };


    const handleSave = async () => {
        // Transforma array de inputs em objeto JSON
        const data = currentFields.reduce((acc: any, field: any) => {
            // Se o input for do tipo number, garante que o JSON envie um número, não string "10"
            acc[field.name] = field.type === 'number' ? Number(field.value) : field.value;
            return acc;
        }, {});

        console.log("Enviando solicitação de ONG:", data); // Debug para o usuário ver no console

        try {
            let response = await registerOng(data);

            if (!response) {
                // Se response for null, houve erro capturado no service
                alert(errorOngService || "Erro desconhecido ao cadastrar ONG.");
                return;
            }

            alert(`Pedido Realizado com Sucesso!`);
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
                    <FontAwesomeIcon icon={faBuildingNgo} size="2x" color="" />
                </div>

                <p
                    style={{ fontSize: '28px', fontWeight: '500' }}
                >
                    Solicitar Cadastro de ONG
                </p>
            </Card>

            <ContainerPage
                variant='a-left'
            >

                <aside>
                    <Card
                        titleSection="Orientações"
                    >
                        <p>Após o envio, nossa equipe irá revisar as informações e entrar em contato para validar o cadastro da sua ONG. Este processo pode levar até 5 dias úteis</p>
                    </Card>
                </aside>

                <main>
                    <Card
                        titleSection="Informações da Organização"
                        subtitleSection="Todos os campos são obrigatórios."
                    >

                        <form
                            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
                        >

                            {currentFields.map((field) => (
                                <Input
                                    key={field.name}
                                    variant={field.variant as 'default' | 'text-area' | 'selection' || (field.type === 'textarea' ? 'text-area' : 'default')}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    value={field.value}
                                    options={field.options}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => handleChange(field.name, e.target.value)}
                                    disabled={field.name === 'gestor_email' && !!preFilledEmail}
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