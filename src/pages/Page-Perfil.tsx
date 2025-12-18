
import Header from "../components/Header/Header";
import DonationReceipt from "../components/DonationReceipt/DonationReceipt";
import { faEnvelope, faLocationDot, faHandHoldingHeart, faBuilding, faTruck, faUserTie, faBuildingNgo } from '@fortawesome/free-solid-svg-icons';
import { translateRole } from "../utils/roleTranslator";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { dataFormatter } from "../utils/dataFormatter";
import InfoContactCard from './../components/InfoContactCard/InfoContactCard';
import ContainerPage from "../components/ContainerPage/ContainerPage";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";
import { getAll, User } from "../services/user.service";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button/Button";
import EntityUpdate from "../components/Forms/EntityUpdate/EntityUpdate";
import HistoryCard from "../components/HistoryCard/HistoryCard";

// ... (imports)

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



export default function PagePerfil({ isMe = false }: PagePerfilProps) {
    const { user: authUser, loading: authLoading } = useAuth();
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


        async function fetchData() {
            setIsLoading(true);

            try {
                const filters = Object.fromEntries(searchParams.entries());


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



    console.log(user)


    const getRoleInfo = (u: Partial<User>) => {
        const role = u.role;
        switch (role) {
            case 'ngoManager':
                return {
                    icon: faBuildingNgo,
                    text: u.managedNGO?.trade_name || u.managedNGO?.name || '-',
                    subtext: 'ONG Vinculada'
                };
            case 'supplierManager':
                return {
                    icon: faTruck,
                    text: u.managedSupplier?.tradeName || '-',
                    subtext: 'Empresa Vinculada'
                };
            case 'admin':
                return { icon: faUserTie, text: 'Administrador', subtext: 'Perfil' };
            default:
                return { icon: faHandHoldingHeart, text: 'Doador', subtext: 'Perfil' };
        }
    }

    const contactList = user ? [
        {
            icon: isMe ? faEnvelope : faCalendar,
            text: isMe ? (user.email || 'Email não disponível') : dataFormatter(user.created_at),
            subtext: isMe ? 'Email' : 'Na Plataforma desde'
        },
        {
            ...getRoleInfo(user)
        }
    ] : [];

    return (
        <>
            {!isMe && searchParams.size === 0 && (
                <Card style={{ width: '300px', margin: '1rem auto' }}>
                    <p>Por favor, informe um parâmetro de busca para visualizar um perfil.</p>
                </Card>
            )}

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
                            role={user.role!}
                            isMe={isMe}
                            onEdit={() => setIsEditing(true)}
                        />



                        <InfoContactCard
                            listContact={contactList}
                        />
                    </aside>

                    <main>
                        {isMe ? (
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
                        ) : (
                            <HistoryCard
                                historyActivities={historyActivities}
                            />
                        )}
                    </main>
                </ContainerPage>
            )}
            {isEditing && user && (
                <EntityUpdate
                    entity={user}
                    typeEntity="user_profile"
                    onClose={() => setIsEditing(false)}
                    onRefresh={handleRefresh}
                />
            )}
        </>
    )
}