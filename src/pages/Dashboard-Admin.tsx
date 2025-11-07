/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { api, SimplifiedUser } from "../services/api";




export default function DashboardAdmin() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataUsers, setDataUsers ] = useState<SimplifiedUser[]>();
    const [ keyHeader, setKeyHeader ] = useState<string[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{

                const responseApi = await api.fetchUsers();

                console.log('React: Exibindo resposta:', responseApi);


                setDataUsers(responseApi);

                if (responseApi && responseApi.length > 0) {
                    setKeyHeader(Object.keys(responseApi[0]));
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
                            </tr>
                        </thead>

                        <tbody>
                            { dataUsers.map((user: SimplifiedUser, rowIdx: number) => (
                                <tr key={rowIdx} style={{ borderBottom: '1px solid #eee' }} >
                                    {keyHeader.map((key: string) => (
                                        <td key={key} style={{ padding: '10px' }}>{(user as any)[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
            </Card>
        </>
    );
}
