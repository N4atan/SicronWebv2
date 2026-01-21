import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Inputs/Input/Input";
import { ENTITY_SCHEMAS } from "../utils/entitySchemas";
import { registerOng, errorOngService } from "../services/ong.service";
import { registerSupplier, errorSupplierService } from "../services/supplier.service";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NGOForm from "../components/Forms/Entity/NGOForm";
import { Oval } from "react-loader-spinner";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import SupplierForm from "../components/Forms/Entity/SupplierForm";

export default function PageSolicitarCadastro({type}: {type: 'supplier' | 'ngo'}) {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);


    const isSupplier = type === 'supplier';
    

    const handleSuccess = () => {
        alert('Cadastro realizado com sucesso!');
        alert('Agora, aguarde a aprovação da equipe do Sicron!.');
        navigate('/');
    }


    return (
        <>
            <Card
                style={{ maxWidth: '700px', margin: '2rem auto 5rem' }}
            >   
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>                    
                    <div style={{display: 'flex', alignItems: 'center', backgroundColor: '#eee', borderRadius: '5px', padding: '1rem'}}>
                        <FontAwesomeIcon icon={faFileLines} size="xl" />
                    </div>

                    <h1>Cadastro de Parceiros - <strong style={{color: '#2bb673'}}>{isSupplier ? 'Fornecedor' : 'ONG'}</strong></h1>

                    { isSupplier ? (
                        <p>Cadastre seu negócio para se tornar um fornecedor parceiro do Sicron</p>
                    ) : (
                        <p>Informe os dados da sua ONG para começar a receber doações.</p>
                    )}                    
                </div>
                
                <div style={{width: '100%', backgroundColor: 'rgba(43, 182, 115, 0.2)', borderRadius: '5px', borderLeft: '4px solid #2bb673', padding: '1rem', margin: '1.5rem 0'}}>
                    <p style={{fontSize: '1rem', color: '#2bb673', fontWeight: 'bold'}}>Orientações Importantes</p>

                    <p style={{fontSize: '0.75rem'}}>Após o envio, nossa equipe irá revisar as informações e entrar em contato para validar o cadastro da sua ONG. Este processo pode levar até 5 dias úteis.</p>
                </div>
                
                { isLoading && (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Oval
                            height={100}
                            width={100}
                            color="#2bb673"
                            ariaLabel="oval-loading"
                            wrapperClass={""}
                            wrapperStyle={{}}
                        />
                    </div>
                )}

                
                { !isLoading && (
                    <>
                        { isSupplier ? (
                            <SupplierForm
                                onLoading={setIsLoading}
                                onSuccess={handleSuccess}   
                            />
                        ) : (
                            <NGOForm
                                onLoading={setIsLoading}
                                onSuccess={handleSuccess}
                            />
                        )}

                        <Button
                            variant="primary"
                            type="submit"
                            form="entity-form"
                            text="Enviar Solicitação"
                            style={{width: '100%', marginTop: '1rem'}}
                        />
                    </>
                )}

            </Card>


            <Footer />
        </>
    )
}