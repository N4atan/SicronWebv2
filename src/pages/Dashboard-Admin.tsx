/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { api, SimplifiedUser } from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import EntityUpdate from "../components/Forms/EntityUpdate/EntityUpdate";




export default function DashboardAdmin() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataUsers, setDataUsers ] = useState<SimplifiedUser[]>();
    const [ keyHeader, setKeyHeader ] = useState<string[]>([]);
    const [ isEditEntity, setIsEditEntity ] = useState(false);
    const [ entityForEdit, setEntityForEdit ] = useState(null);
    const [ typeEntity, setTypeEntity ] = useState('');

    const handleClickForEdit = (obj: any, type: string) => {
        setIsEditEntity(true);
        setEntityForEdit(obj);
        setTypeEntity(type);
    }

    useEffect(()=>{
        const fetchData = async () => {
            try{

                const responseApiUsers = await api.fetchUsers();

                setDataUsers(responseApiUsers);

                if (responseApiUsers && responseApiUsers.length > 0) {
                    setKeyHeader(Object.keys(responseApiUsers[0]));
                }

            } catch (e: any) {
                console.error('React: Erro:', e);
                alert(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <Header />


            <div style={{ textAlign:"initial", margin: "50px", fontSize: "13px"}}>

                <h1>Painel Administrativo</h1>

            </div>

            

            {/* Seção de Itens de Doação */}
            
            <Card 
                titleSection="Usuários"
                subtitleSection="Gerencie todos os usuários cadastrados no sistema."
                style={{ margin: '50px auto', maxWidth: '1000px' }}
            >
                { !isLoading && dataUsers && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                {keyHeader.map((key) => (
                                    <th key={key} style={{ padding: '10px' }}>{key}</th>
                                ))}

                                <th>
                                    ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            { dataUsers.map((user: SimplifiedUser, rowIdx: number) => (
                                <tr key={rowIdx} style={{ borderBottom: '1px solid #eee' }} >
                                    {keyHeader.map((key: string) => (
                                        <td key={key} style={{ padding: '10px' }}>{(user as any)[key]}</td>
                                    ))}

                                    <td>
                                        <FontAwesomeIcon icon={faPencil} style={{marginRight: '10px'}} cursor={'pointer'} onClick={() => handleClickForEdit(user, 'Usuário')} />
                                        <FontAwesomeIcon icon={faTrash}  cursor={'pointer'} />
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
    
            </Card>

            { isEditEntity && (
                <EntityUpdate 
                    entity={entityForEdit} 
                    typeEntity={typeEntity} 
                    onClose={() => setIsEditEntity(false)}
                />
            )}
        </>
    );
}
