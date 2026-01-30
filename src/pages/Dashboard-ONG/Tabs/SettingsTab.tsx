import Button from "../../../components/Button/Button";
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

                <Button
                    variant='primary'
                    text='Salvar Novas Informações'
                    type='submit'
                    form="entity-form"
                    style={{ width: '100%', marginTop: '20px' }}
                />
            </Card>
        </div>
    );
}
