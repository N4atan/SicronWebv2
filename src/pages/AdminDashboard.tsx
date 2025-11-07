import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import {api} from "../services/api";
import { data } from "react-router-dom";



export default function AdminDashboard() {
    const [dataUsers, setDataUsers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataUsers(await api.fetchUsers());
            } catch (e: any) {
                alert(e);
                console.error(e);
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    console.log('Exibindo dados no front:', dataUsers)

    return (
        <>
            <Header />


            <div style={{ textAlign:"initial", margin: "50px", fontSize: "13px"}}>

                <h1>Painel Administrativo</h1>

            </div>

            

            {/* Seção de Itens de Doação */}
            <div style={{ margin: '50px auto', maxWidth: '1000px' }}>
                <Card 
                    titleSection="Usuários"
                    subtitleSection="Gerencie todos os usuários cadastrados."
                >
                    { error && (
                        <p>{error}</p>
                    )}
                    
                </Card>
            </div>
        </>
    );
}
