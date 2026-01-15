import { useState } from "react";
import Modal from "../../Modal/Modal";
import { Oval } from "react-loader-spinner";
import { User, NGO, Product, Supplier } from "../../../interfaces";
import UserForm from "./UserForm";
import './EntityModal.css';
// import OngForm from "./OngForm"; // Vamos criar em breve
import ProductForm from "./ProductForm"; // Vamos criar em breve
// import SupplierForm from "./SupplierForm"; // Vamos criar em breve

type Props = {
    title: string;
    entity?: Partial<User> | Partial<NGO> | Partial<Product> | Partial<Supplier> | null; // Dados iniciais (se edição)
    typeEntity: 'user' | 'ong' | 'product' | 'supplier'; // OBRIGATÓRIO para saber qual form abrir
    onClose: () => void;
    onRefresh?: () => void;
}

export default function EntityModal({ title, entity, typeEntity, onClose, onRefresh }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Função que será passada para os Forms chamarem quando terminarem
    const handleSuccess = () => {
        if (onRefresh) onRefresh();
        onClose();
    }

    // Botão de salvar externo precisa deste ID para dar submit no form
    const FORM_ID = "entity-form";

    return (
        <Modal
            title={title}
            pText="Salvar"
            sText="Cancelar"
            // O botão do modal dispara o submit do form via ID
            // OBS: O 'onSave' manual sai, quem controla é o onSubmit do form
            pForm={FORM_ID}
            sEvent={onClose}
            xEvent={onClose}
            isLoading={isLoading}
        >
            {isLoading ? (
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                    wrapperStyle={{ alignSelf: 'center', margin: '20px' }}
                />
            ) : (
                <>
                    {typeEntity === 'user' && (
                        <UserForm
                            initialData={entity as User}
                            onSuccess={handleSuccess}
                            onLoading={setIsLoading}
                        />
                    )}

                    {typeEntity === 'product' && (
                        <ProductForm
                            initialData={entity as Product}
                            onSuccess={handleSuccess}
                            onLoading={setIsLoading}
                        />
                    )}

                    {/* 
                    {typeEntity === 'ong' && <OngForm initialData={entity as NGO} onSuccess={handleSuccess} />}
                    */}
                </>
            )}

        </Modal>
    )
}