import { useState } from "react";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import EntityCreate from "../../../../components/Forms/EntityCreate/EntityCreate";
import EntityUpdate from "../../../../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../../../../components/Table/DynamicTable/DynamicTable";
import { EntityType } from "../../Dashboard-Admin";
import { api } from "../../../../services/api";



type Props = {
    onfreshData: (entity: EntityType) => Promise<void>;
    isLoading: boolean;
    dataUsers: any[];
    dataOngs: any[];
}


export default function TabCadastro({onfreshData, isLoading, dataUsers, dataOngs}: Props) {
    // Controle do Modal de Edição
    const [isEditEntity, setIsEditEntity] = useState(false);
    const [entityForEdit, setEntityForEdit] = useState<any>(null);
    const [typeEntity, setTypeEntity] = useState<EntityType>('user'); // Valor padrão ou undefined

    // Controle do Modal de Criação
    const [isCreatingEntity, setIsCreatingEntity] = useState(false);


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
            onfreshData(type); // Recarrega apenas a tabela afetada

        } catch (error) {
            console.error(error);
            alert("Erro ao tentar excluir.");
        }
    };



    return (
        <>
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
                onRefresh={() => onfreshData(typeEntity)}
            />
        )}

        {/* Modal de Criação */}
        {isCreatingEntity && (
            <EntityCreate
                onClose={() => setIsCreatingEntity(false)}
                onRefresh={() => onfreshData(typeEntity)}
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
            style={{ margin: '50px auto'}}
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
    )
}