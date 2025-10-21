import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { LabelIcon } from "../components/Label/Label-Icon/LabelIcon";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from "../components/ProfileCard/ProfileCard";

export default function PagePerfil() {
    return (
        <>
        <Header />

        <Card
            titleSection="Informações de Contato"
            subtitleSection="Informações do usuário"
            style={{width: '300px'}}
        >
            <LabelIcon 
                icon={faEnvelope}
                text="seu@email.com"
                subtext="Email"
            />
        </Card>


        <ProfileCard
            src="https://placehold.co/200"
            name="Quatro Patas"
            tags={['Tag1', 'Tag2', 'Tag3']}
            style={{width: '800px', display: "flex", flexDirection: "row", gap: '20px'}}
        />
        </>
    )
}