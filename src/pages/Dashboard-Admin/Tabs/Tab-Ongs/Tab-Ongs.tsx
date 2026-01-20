import { use, useEffect, useState } from "react";
import OngRequestCard from "../../../../components/OngRequestCard/OngRequestCard";
import { api, SimplifiedOng } from "../../../../services/api";
import Card from "../../../../components/Card/Card";
import './Tab-Ongs.css';
import Input from "../../../../components/Inputs/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    dataOngs: SimplifiedOng[];
    isLoading: boolean;
    onRefreshData: (entity: 'ong') => Promise<void>;
}

export default function TabOngs(props: Props) {


    const handleClickButton = async (id: number, status: 'APROVADA' | 'REJEITADA') => {
        try {
            const response = await api.fetchUpdateStatusOng(id, status);

            if (!response) {
                alert(api.errorResponse);
                console.error(api.errorResponse);
                return;
            }

            alert(`ONG ${status === 'APROVADA' ? 'Aprovada' : 'Rejeitada'} com sucesso!`);
            props.onRefreshData('ong');


        } catch (error) {
            console.error("Erro ao atualizar status da ONG:", error);
        }
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {props.isLoading && <Card><p>Carregando...</p></Card>}


            <div className="container-cards">
                {/* Se quiser cards de resumo no topo, pode por aqui */}
            </div>

            <Card>
                <div className="container-filters">
                    <Input
                        variant="selection"
                        label="Filtar por Status:"
                        options={[
                            'Todas', 'Ativas', 'Pendentes', 'Rejeitadas'
                        ]}
                        style={{ width: '200px' }}
                    />

                    <Input
                        variant="default"
                        label="Filtar por Nome:"
                        icon={faMagnifyingGlass}
                        placeholder="Digite o Nome Fantasia da ONG"
                    />
                </div>


                <div className="container-ongs">
                    {
                        props.dataOngs.map((ong) => (
                            <OngRequestCard key={ong.id} ongRequest={ong} onClickButton={handleClickButton} />
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}