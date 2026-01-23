import Card from "../../../components/Card/Card";
import NGOForm from "../../../components/Forms/Entity/NGOForm";
import { NGO } from "../../../interfaces";

interface SettingsTabProps {
    ngo: NGO;
    onSuccess: () => void;
    onLoading: (isLoading: boolean) => void;
}

export default function SettingsTab({ ngo, onSuccess, onLoading }: SettingsTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <Card titleSection="Minha ONG" subtitleSection="Edite as informações da sua ONG.">
                <NGOForm
                    initialData={ngo}
                    onSuccess={onSuccess}
                    onLoading={onLoading}
                />
            </Card>
        </div>
    );
}
