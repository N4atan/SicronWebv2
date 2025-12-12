
import Header from "../components/Header/Header";

import DonationReceipt from "../components/DonationReceipt/DonationReceipt";
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import InfoContactCard from './../components/InfoContactCard/InfoContactCard';
import ContainerPage from "../components/ContainerPage/ContainerPage";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";
import { getAll, User } from "../services/user.service";


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
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<Partial<User> | null>(null);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const filters = Object.fromEntries(searchParams.entries());
                const result: Partial<User>[] = await getAll(filters);

                if (!result[0]) {
                    alert("Usuário não encontrado.");
                    setUser(null);
                    return;
                }

                setUser(result[0]);

            } catch (error: unknown) {
                alert(String(error));
                console.error(error);

            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchParams]);


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
                                    text: user.email || 'Retirar',
                                    subtext: 'Email'
                                }
                            ]}
                        />
                    </aside>

                    <main>
                        <DonationReceipt
                            id="123"
                            date="2022-01-01"
                            ongName="ONG Teste"
                            donorName="Doador Teste"
                            items={[
                                { name: "Item 1", qtd: 1, price: 10 },
                                { name: "Item 2", qtd: 2, price: 20 },
                            ]}
                            total={50}
                        />
                    </main>
                </ContainerPage>
            )}
        </>
    )
}