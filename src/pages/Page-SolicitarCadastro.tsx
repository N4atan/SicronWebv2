import { useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Input from "../components/Inputs/Input/Input";
import { FORM_SCHEMAS, api } from "../services/api"; // FORM_SCHEMAS ainda precisa ser achado ou definido localmente se sumiu
import { registerOng, errorOngService } from "../services/ong.service";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingNgo, faLaptopFile, faTreeCity } from "@fortawesome/free-solid-svg-icons";
import ContainerPage from "../components/ContainerPage/ContainerPage";
import { on } from "events";



import { useLocation } from "react-router-dom";

export default function PageSolicitarCadastro() {
    const location = useLocation();
    const preFilledEmail = location.state?.email;

    const [currentFields, setCurrentFields] = useState(() => {
        const fields = FORM_SCHEMAS['ong']; // Clona para evitar mutação direta se necessário, mas map resolve
        if (preFilledEmail) {
            return fields.map(f => f.name === 'contact_email' ? { ...f, value: preFilledEmail } : f);
        }
        return fields;
    });

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

        try {
            let response = await registerOng(data);

            if (!response) {
                alert(errorOngService);
                return;
            }

            alert(`Pedido Realizado!`);
        } catch (e: any) {
            console.error(e);
            alert("Erro inesperado na aplicação.");
        }
    }


    return (
        <>
            <Header />

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
                                    variant={field.type === 'textarea' ? 'text-area' : 'default'}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(field.name, e.target.value)}
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