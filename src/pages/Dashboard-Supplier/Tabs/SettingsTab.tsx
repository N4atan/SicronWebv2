import Card from "../../../components/Card/Card";
import SupplierForm from "../../../components/Forms/Entity/SupplierForm";
import { Supplier } from "../../../interfaces";

interface SettingsTabProps {
    supplier: Supplier;
    onSuccess: () => void;
    onLoading: (isLoading: boolean) => void;
}

export default function SettingsTab({ supplier, onSuccess, onLoading }: SettingsTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <Card titleSection="Minha Empresa" subtitleSection="Edite as informações da sua empresa.">
                <SupplierForm
                    initialData={supplier}
                    onSuccess={onSuccess}
                    onLoading={onLoading}
                />
            </Card>
        </div>
    );
}
