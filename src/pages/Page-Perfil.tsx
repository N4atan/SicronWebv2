
import Header from "../components/Header/Header";

import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from "../components/ProfileCard/ProfileCard";
import InfoContactCard from './../components/InfoContactCard/InfoContactCard';
import HistoryCard from "../components/HistoryCard/HistoryCard";
import Card from "../components/Card/Card";
import Contato from "../components/Forms/Contato/Contato";


import './Page-Perfil.css';


const listContact =[
    {
        icon: faEnvelope,
        text: 'seu@email.com',
        subtext: 'Email'
    },
    {
        icon: faLocationDot,
        text: 'seu@email.com',
        subtext: 'Email'
    }
];

const historyActivities = [
    {
        text: 'Atividade 1',
        subtext: 'Descrição da atividade 1'
    },
    {
        text: 'Atividade 2',
        subtext: 'Descrição da atividade 2'
    },
    {
        text: 'Atividade 3',
        subtext: 'Descrição da atividade 3'
    },
]

export default function PagePerfil() {
    return (
        <>
            <Header />

            <ProfileCard
                src="https://placehold.co/200"
                name="Nome do Usuário"
                style={{ maxWidth: '800px', display: "flex", flexDirection: "row", gap: '20px', margin: '2rem auto' }}
            />



            <div className="container-page">

                <aside>
                    <InfoContactCard
                        listContact={listContact}
                    />
                </aside>

                <main>
                    <HistoryCard
                        historyActivities={historyActivities}
                    />
                </main>

            </div>
        </>
    )
}