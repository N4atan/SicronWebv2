
import Header from "../components/Header/Header";

import DonationReport from "../components/DonationReport/DonationReport";
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from "../components/ProfileCard/ProfileCard";
import InfoContactCard from './../components/InfoContactCard/InfoContactCard';
import HistoryCard from "../components/HistoryCard/HistoryCard";
import ContainerPage from "../components/ContainerPage/ContainerPage";
import { useParams } from "react-router-dom";
import { api, SimplifiedUser } from './../services/api';
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";


const listContact = [
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
    const [user, setUser] = useState<SimplifiedUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {

        async function fetchData() {
            try {
                // O isLoading já começa 'true', não precisa setar de novo
                const response: SimplifiedUser | null = await api.fetchUser(String(id));
                setUser(response);
                console.table(response);

            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                alert(`Erro ao buscar usuário: ${error}`);
            } finally {
                // AGORA SIM: Isso só roda depois do 'await' ou do 'catch'
                setIsLoading(false);
            }
        };

        fetchData();

    }, [id])


    return (
        <>
            <Header />

            {isLoading || !user && (
                <Card
                    style={{ width: '300px', margin: '1rem auto' }}
                >
                    <p>{!user ? 'Usuário não encontrado' : 'Buscando usuário...'}</p>
                </Card>
            )}

            {!isLoading && user && (
                <ContainerPage
                    variant="a-left"
                    isPageUser={true}
                >
                    <aside>
                        <UserProfileCard
                            name={user.username}
                        />

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
                        <DonationReport
                            id="don1"
                            date="19/10/2025"
                            ongName="Instituto Educação Para Todos"
                            items={[
                                { name: "Cadernos Universitários", qtd: 20, price: 12.5 },
                                { name: "Canetas Esferográficas", qtd: 50, price: 2.0 }
                            ]}
                            total={350}
                            onViewReceipt={() => console.log("abrir comprovante")}
                        />
                    </main>
                </ContainerPage>
            )}
        </>
    )
}