
import Header from "../components/Header/Header";

import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from "../components/ProfileCard/ProfileCard";
import InfoContactCard from './../components/InfoContactCard/InfoContactCard';
import HistoryCard from "../components/HistoryCard/HistoryCard";
import ContainerPage from "../components/ContainerPage/ContainerPage";
import { useParams } from "react-router-dom";
import { api, SimplifiedUser } from './../services/api';
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";


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
    const [ user, setUser ] = useState<SimplifiedUser | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);

    const { id } = useParams();

    useEffect(()=> {

        if(!id) return alert('Usuário não especificado na URL.');

        try {
            async function fetchData(){
                const response: SimplifiedUser | null = await api.fetchUser(id);

                setUser(response);
                console.table(response);
            };

            fetchData();

        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            alert(`Erro ao buscar usuário: ${error});`);
        } finally {
            setIsLoading(false);
        }

    }, [id])

    return (
        <>
            <Header />

            { isLoading || !user && (
                <Card>
                    <p>
                        {isLoading? 'Buscando Usuário...' : 'Usuário não encontrado'}
                    </p>
                </Card>
            )}

            { user && (
                <>
                <ProfileCard
                    src="https://placehold.co/200"
                    name={user.username}
                    tags={['-', '-' ]}
                />

                <ContainerPage
                    variant="a-left"
                >
                    <aside>
                        <InfoContactCard
                            listContact={[
                                {
                                    icon: faEnvelope,
                                    text: user.email,
                                    subtext: 'Email'
                                }
                            ]}
                        />
                    </aside>

                    <main>
                        <HistoryCard
                            historyActivities={historyActivities}
                        />
                    </main>
                </ContainerPage>
                </>
            )}
        </>
    )
}