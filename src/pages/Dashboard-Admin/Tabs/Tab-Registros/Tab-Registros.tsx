import { useState } from "react";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import EntityCreate from "../../../../components/Forms/EntityCreate/EntityCreate";
import EntityUpdate from "../../../../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../../../../components/Table/DynamicTable/DynamicTable";
import { EntityType } from "../../Dashboard-Admin";
import { deleteUser, errorUserService } from "../../../../services/user.service";
import { deleteOng, errorOngService } from "../../../../services/ong.service";
import { deleteSupplier, errorSupplierService } from "../../../../services/supplier.service";
import { deleteProduct } from "../../../../services/product.service";
import { User, NGO, Supplier, Product } from "../../../../interfaces";


type Props = {
    onfreshData: (entity: EntityType) => Promise<void>;
    isLoading: boolean;
    dataUsers: User[];
    dataOngs: NGO[];
    dataSuppliers: Supplier[];
    dataProducts: Product[];
}


export default function TabRegistro({ onfreshData, isLoading, dataUsers, dataOngs, dataSuppliers, dataProducts }: Props) {
    // Controle do Modal de Edição
    const [isEditEntity, setIsEditEntity] = useState(false);
    const [entityForEdit, setEntityForEdit] = useState<any>(null);
    const [typeEntity, setTypeEntity] = useState<EntityType>('user'); // Valor padrão ou undefined

    // Controle do Modal de Criação
    const [isCreatingEntity, setIsCreatingEntity] = useState(false);


    // Prepara o modal de edição. 
    // IMPORTANTE: Recebe o objeto E o tipo (user ou ong)
    const handleClickForEdit = (obj: any, type: EntityType) => {
        console.log("handleClickForEdit - Obj:", obj);
        setEntityForEdit(obj);
        setTypeEntity(type); // Agora sabemos quem estamos editando
        setIsEditEntity(true);
    };

    const handleClickForDelete = async (obj: any, type: EntityType) => {
        console.log("handleClickForDelete - Obj:", obj);

        // Prioriza UUID se existir (padrão atual), senão tenta ID (legacy)
        const identifier = obj.uuid || obj.id;
        console.log(`handleClickForDelete - Identifier extracted: ${identifier} (Type: ${typeof identifier})`);

        if (!identifier) {
            alert("Erro: ID inválido para exclusão.");
            return;
        }

        if (!window.confirm(`Tem certeza que deseja excluir o ID: ${identifier}?`)) return;

        try {
            let success = false;
            let errorMessage = "";

            if (type === 'user') {
                success = await deleteUser(identifier);
                errorMessage = errorUserService;
            } else if (type === 'ong') {
                success = await deleteOng(identifier);
                errorMessage = errorOngService;
            } else if (type === 'supplier') {
                success = await deleteSupplier(identifier);
                errorMessage = errorSupplierService;
            } else if (type === 'product') { // Assumindo que EntityType suporta 'product' ou vamos ajustar
                // @ts-ignore
                success = await deleteProduct(identifier);
            }

            if (!success) {
                alert("Não foi possível excluir este registro.\n\nMotivo provável: Este item possui vínculos ativos (ONGs, Produtos, Fornecedores, etc) que impedem a exclusão.\n\nRemova os vínculos antes de tentar novamente.\n\nDetalhes do erro: " + (errorMessage || "Erro desconhecido."));
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
                titleSection="Barra de Ação Rápida"
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        variant="primary"
                        type="button"
                        text="Novo Cadastro"
                        onClick={() => setIsCreatingEntity(true)}
                    />
                </div>
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
                style={{ margin: '50px auto' }}
            >
                {isLoading ? (
                    <p>Carregando Usuários...</p>
                ) : (
                    <DynamicTable
                        typeData="user"
                        listData={dataUsers || []}
                        onEdit={(obj) => handleClickForEdit(obj, 'user')}
                        onDelete={(obj) => handleClickForDelete(obj, 'user')}
                    />
                )}
            </Card>

            {/* Tabela de ONGs */}
            <Card
                titleSection="ONGS"
                subtitleSection="Gerencie todas as ongs cadastrados no sistema."
                style={{ margin: '50px auto' }}
            >
                {isLoading ? (
                    <p>Carregando ONGs...</p>
                ) : (
                    <DynamicTable
                        typeData="ong"
                        listData={dataOngs || []}
                        onEdit={(obj) => handleClickForEdit(obj, 'ong')}
                        onDelete={(obj) => handleClickForDelete(obj, 'ong')}
                    />
                )}
            </Card>

            {/* Tabela de Fornecedores */}
            <Card
                titleSection="Fornecedores"
                subtitleSection="Gerencie todos os fornecedores cadastrados."
                style={{ margin: '50px auto' }}
            >
                {isLoading ? (
                    <p>Carregando Fornecedores...</p>
                ) : (
                    <DynamicTable
                        typeData="supplier"
                        listData={dataSuppliers || []}
                        onEdit={(obj) => handleClickForEdit(obj, 'supplier')}
                        onDelete={(obj) => handleClickForDelete(obj, 'supplier')}
                    />
                )}
            </Card>

            {/* Tabela de Produtos */}
            <Card
                titleSection="Produtos Globais"
                subtitleSection="Catálogo de produtos disponíveis na plataforma."
                style={{ margin: '50px auto' }}
            >
                {isLoading ? (
                    <p>Carregando Produtos...</p>
                ) : (
                    <DynamicTable
                        typeData="ong" // Reuso temporário do layout ou precisamos de 'product' no DynamicTable
                        listData={dataProducts || []}
                        onEdit={(obj) => alert('Edição de produto via tabela ainda não implementada')}
                        // @ts-ignore
                        onDelete={(obj) => handleClickForDelete(obj, 'product')}
                    />
                )}
            </Card>
        </>
    )
}