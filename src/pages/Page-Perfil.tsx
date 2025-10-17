import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { LabelIcon } from "../components/Label/Label-Icon/LabelIcon";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function PagePerfil() {
    return (
        <>
        <Header />

        <Card
            titleSection="Informações de Contato"
            subtitleSection="Informações do usuário"
            style={{width: '400px'}}
        >
            <LabelIcon 
                icon={faEnvelope}
                text="seu@email.com"
                subtext="Email"
            />

        </Card>
        </>
    )
}