
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
import { useAuth } from "../contexts/AuthContext";


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

interface PagePerfilProps {
    isMe?: boolean;
}

import Button from "../components/Button/Button";
import EntityUpdate from "../components/Forms/EntityUpdate/EntityUpdate";

export default function PagePerfil({ isMe = false }: PagePerfilProps) {
    const { user: authUser, loading: authLoading, signOut } = useAuth();
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<Partial<User> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // ... useEffect ...

    const handleRefresh = () => {
        // Como o contexto não atualiza automaticamente sem refresh e mudamos dados com API rest,
        // o ideal seria recarregar.
        window.location.reload();
    }

    useEffect(() => {
        // Modo "Meu Perfil": Usa dados do contexto
        if (isMe) {
            if (!authLoading) {
                if (!authUser) {
                    // Se não estiver logado e tentar acessar /perfil/me, alerta e redireciona.
                    alert("Você precisa fazer login para acessar seu perfil.");
                    window.location.href = '/login';
                    return;
                } else {
                    setUser(authUser);
                }
                setIsLoading(false);
            }
            return;
        }

        // Modo "Perfil Público": Busca via URL params
        async function fetchData() {
            setIsLoading(true);

            try {
                const filters = Object.fromEntries(searchParams.entries());

                // CORREÇÃO: Se não tiver filtros, não busca nada!
                // Evita carregar o primeiro usuário do banco (ex: Natan) aleatoriamente.
                if (Object.keys(filters).length === 0) {
                    setIsLoading(false);
                    return;
                }

                const result: Partial<User>[] = await getAll(filters);

                if (!result[0]) {
                    setUser(null);
                    return;
                }

                setUser(result[0]);

            } catch (error: unknown) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchParams, isMe, authUser, authLoading]);


    return (
        <>
            {/* Caso Especial: Sem parâmetros de busca na URL (e não é "me") */}
            {!isMe && searchParams.size === 0 && (
                <Card style={{ width: '300px', margin: '1rem auto' }}>
                    <p>Por favor, informe um parâmetro de busca para visualizar um perfil.</p>
                </Card>
            )}

            {/* Loading ou Usuário não encontrado (Só exibe se tiver parâmetros ou for "me") */}
            {(isMe || searchParams.size > 0) && (isLoading || !user) && (
                <Card
                    style={{ width: '300px', margin: '1rem auto' }}
                >
                    <p>{isLoading ? 'Buscando usuário...' : 'Usuário não encontrado'}</p>
                </Card>
            )}

            {!isLoading && user && (
                <ContainerPage
                    variant="a-left"
                    isPageUser={true}
                >
                    <aside>
                        <UserProfileCard
                            name={user.username!}
                            onLogout={isMe ? () => {
                                alert("Você será redirecionado para a página de login.");
                                signOut();
                            } : undefined}
                            isMe={isMe}
                            onEdit={() => setIsEditing(true)}
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
            {isEditing && user && (
                <EntityUpdate
                    entity={user}
                    typeEntity="user_profile" // Usa o schema restrito que criamos
                    onClose={() => setIsEditing(false)}
                    onRefresh={handleRefresh}
                />
            )}
        </>
    )
}