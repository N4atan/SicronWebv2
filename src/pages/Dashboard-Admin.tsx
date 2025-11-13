/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { api, SimplifiedUser, SimplifiedOng } from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import EntityUpdate from "../components/Forms/EntityUpdate/EntityUpdate";
import DynamicTable from "../components/Table/DynamicTable/DynamicTable";
import EntityCreate from "../components/Forms/EntityCreate/EntityCreate";
import Button from "../components/Button/Button";




export default function DashboardAdmin() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataUsers, setDataUsers ] = useState<SimplifiedUser[]>();
    const [ dataOngs, setDataOngs   ] = useState<SimplifiedOng>();
    
    const [ isEditEntity, setIsEditEntity ] = useState(false);
    const [ entityForEdit, setEntityForEdit ] = useState(null);
    const [ typeEntity, setTypeEntity ] = useState('');

    const [ isCreatingEntity, setIsCreatingEntity ] = useState(false);

    const fetchData = async () => {
        try{

            const responseApiUsers = await api.fetchUsers();

            setDataUsers(responseApiUsers);

        } catch (e: any) {
            console.error('React: Erro:', e);
            alert(e);
        } finally {
            setIsLoading(false);
        }
    }


    const handleClickForEdit = (obj: any, type: string) => {
        setIsEditEntity(true);
        setEntityForEdit(obj);
        setTypeEntity(type);
    }


    const handleClickForDelete = async (obj: any, type: string) => {
        const response = await api.fetchDeleteUser(obj.id);

        if (!response) {
            alert(api.errorResponse);
            return;
        }

        alert(response);

        fetchData();
    }

    
    useEffect(()=>{
        try {
            fetchData();
        } catch (e: unknown) {
            alert(e)
        } finally {
            setIsLoading(false);
        }
    }, [])

    return (
        <>
            <Header />


            <div style={{ textAlign:"initial", margin: "50px", fontSize: "13px"}}>

                <h1>Painel Administrativo</h1>

            </div>

            <Card
                titleSection="Barra de Ações"
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                <Button 
                    variant="primary"
                    type="button"
                    text="Adicionar"
                    onClick={() => setIsCreatingEntity(true)}
                />
            </Card>

            { isEditEntity && (
                <EntityUpdate 
                    entity={entityForEdit} 
                    typeEntity={typeEntity} 
                    onClose={() => setIsEditEntity(false)}
                    onRefresh={() => fetchData()}
                />
            )}


            { isCreatingEntity && (
                <EntityCreate 
                onClose={() =>setIsCreatingEntity(false)}
                />
            )}
            
        
            <Card 
                titleSection="Usuários"
                subtitleSection="Gerencie todos os usuários cadastrados no sistema."
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >   
                { isLoading && (
                    <p>Carregando Dados...</p>
                )}

                { !isLoading && (
                    <DynamicTable 
                        typeData="user"
                        listData={dataUsers!}
                        onEdit={handleClickForEdit}
                        onDelete={handleClickForDelete}
                    />
                )}
    
            </Card>

            <Card 
                titleSection="ONGS"
                subtitleSection="Gerencie todas as ongs cadastrados no sistema."
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                { isLoading && (
                    <p>Carregando Dados...</p>
                )}

                

            </Card>
        </>
    );
}
