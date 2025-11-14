/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { api, SimplifiedUser, SimplifiedOng } from "../services/api";
import EntityUpdate from "../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../components/Table/DynamicTable/DynamicTable";
import EntityCreate from "../components/Forms/EntityCreate/EntityCreate";
import Button from "../components/Button/Button";

// Defino um tipo para evitar erros de string solta
type EntityType = 'user' | 'ong';

export default function DashboardAdmin() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataUsers, setDataUsers] = useState<SimplifiedUser[]>([]);
    const [dataOngs, setDataOngs] = useState<SimplifiedOng[]>([]);

    // Controle do Modal de Edição
    const [isEditEntity, setIsEditEntity] = useState(false);
    const [entityForEdit, setEntityForEdit] = useState<any>(null);
    const [typeEntity, setTypeEntity] = useState<EntityType>('user'); // Valor padrão ou undefined

    // Controle do Modal de Criação
    const [isCreatingEntity, setIsCreatingEntity] = useState(false);

    // Função genérica para buscar dados
    const fetchData = async (entity: EntityType) => {
        try {
            // Não setamos isLoading false aqui dentro para não conflitar
            if (entity === 'user') {
                const response = await api.fetchUsers();
                if (response) setDataUsers(response);
            }

            if (entity === 'ong') {
                const response = await api.fetchOngs();
                if (response) setDataOngs(response);
            }
        } catch (e: any) {
            console.error('Erro ao buscar dados:', e);
        }
    };

    // Carregamento inicial (com Promise.all para esperar OS DOIS terminarem)
    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchData('user'),
                    fetchData('ong')
                ]);
            } catch (e) {
                alert("Erro ao carregar painel");
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();
    }, []);

    // Prepara o modal de edição. 
    // IMPORTANTE: Recebe o objeto E o tipo (user ou ong)
    const handleClickForEdit = (obj: any, type: EntityType) => {
        setEntityForEdit(obj);
        setTypeEntity(type); // Agora sabemos quem estamos editando
        setIsEditEntity(true);
    };

    const handleClickForDelete = async (obj: any, type: EntityType) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;

        try {
            let response;
            if (type === 'user') {
                response = await api.fetchDeleteUser(obj.id);
            } else if (type ==='ong'){
                response = await api.fetchDeleteOng(obj.id);
            }else {
                // Assumindo que existe um delete para ONG, senão tem que criar
                // response = await api.fetchDeleteOng(obj.id); 
                alert("Funcionalidade de deletar ONG ainda não implementada na API");
                return;
            }

            if (!response) {
                alert("Erro ao excluir.");
                return;
            }

            alert("Excluído com sucesso!");
            fetchData(type); // Recarrega apenas a tabela afetada

        } catch (error) {
            console.error(error);
            alert("Erro ao tentar excluir.");
        }
    };

    return (
        <>
            <Header />

            <div style={{ textAlign: "initial", margin: "50px", fontSize: "13px" }}>
                <h1>Painel Administrativo</h1>
            </div>

            <Card
                titleSection="Barra de Ações"
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                <Button
                    variant="primary"
                    type="button"
                    text="Adicionar Novo"
                    onClick={() => setIsCreatingEntity(true)}
                />
            </Card>

            {/* Modal de Edição */}
            {isEditEntity && (
                <EntityUpdate
                    entity={entityForEdit}
                    typeEntity={typeEntity} // Passa a string limpa 'user' ou 'ong'
                    onClose={() => setIsEditEntity(false)}
                    onRefresh={() => fetchData(typeEntity)}
                />
            )}

            {/* Modal de Criação */}
            {isCreatingEntity && (
                <EntityCreate
                    onClose={() => setIsCreatingEntity(false)}
                    onRefresh={() => fetchData(typeEntity)}
                />
            )}

            {/* Tabela de Usuários */}
            <Card
                titleSection="Usuários"
                subtitleSection="Gerencie todos os usuários cadastrados no sistema."
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                {isLoading ? (
                    <p>Carregando Usuários...</p>
                ) : (
                    <DynamicTable
                        typeData="user"
                        listData={dataUsers || []}
                        // Aqui está o segredo: usamos uma arrow function para passar o tipo certo
                        onEdit={(obj) => handleClickForEdit(obj, 'user')}
                        onDelete={(obj) => handleClickForDelete(obj, 'user')}
                    />
                )}
            </Card>

            {/* Tabela de ONGs */}
            <Card
                titleSection="ONGS"
                subtitleSection="Gerencie todas as ongs cadastrados no sistema."
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                {isLoading ? (
                    <p>Carregando ONGs...</p>
                ) : (
                    <DynamicTable
                        typeData="ong" // Hardcoded 'ong' porque ESSA é a tabela de ongs
                        listData={dataOngs || []}
                        onEdit={(obj) => handleClickForEdit(obj, 'ong')}
                        onDelete={(obj) => handleClickForDelete(obj, 'ong')}
                    />
                )}
            </Card>
        </>
    );
}