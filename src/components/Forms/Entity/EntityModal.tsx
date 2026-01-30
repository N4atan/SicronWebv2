import { useState } from "react";
import Modal from "../../Modal/Modal";
import { Oval } from "react-loader-spinner";
import { User, NGO, Product, Supplier } from "../../../interfaces";
import UserForm from "./UserForm";
import './EntityModal.css';
import ProductForm from "./ProductForm";
import NGOForm from "./NGOForm";
import SupplierForm from "./SupplierForm";

type Props = {
    title: string;
    entity?: Partial<User> | Partial<NGO> | Partial<Product> | Partial<Supplier> | null;
    typeEntity: 'user' | 'ong' | 'product' | 'supplier' | 'ngoProduct' | 'supplierProduct';
    parentUuid?: string;
    availableOptions?: Product[];
    onClose: () => void;
    onRefresh?: () => void;
}

export default function EntityModal({ title, entity, typeEntity, parentUuid, availableOptions, onClose, onRefresh }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSuccess = () => {
        if (onRefresh) onRefresh();
        onClose();
    }

    const FORM_ID = "entity-form";

    return (
        <Modal
            title={title}
            pText="Salvar"
            sText="Cancelar"
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

                    {(typeEntity === 'product' || typeEntity === 'ngoProduct' || typeEntity === 'supplierProduct') && (
                        <ProductForm
                            initialData={entity as Product}
                            onSuccess={handleSuccess}
                            onLoading={setIsLoading}
                            parentUuid={parentUuid}
                            typeEntity={typeEntity}
                            availableOptions={availableOptions}
                        />
                    )}

                    {typeEntity === 'ong' && (
                        <NGOForm
                            initialData={entity as NGO}
                            onSuccess={handleSuccess}
                            onLoading={setIsLoading}
                        />
                    )}

                    {typeEntity === 'supplier' && (
                        <SupplierForm
                            initialData={entity as Supplier}
                            onSuccess={handleSuccess}
                            onLoading={setIsLoading}
                        />
                    )}
                </>
            )}
        </Modal>
    )
}