import { use, useEffect, useState } from "react";
import OngRequestCard from "../../../../components/OngRequestCard/OngRequestCard";
import { updateOng, NGO, errorOngService } from "../../../../services/ong.service";
import Card from "../../../../components/Card/Card";
import './Tab-Ongs.css';
import Input from "../../../../components/Inputs/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    dataOngs: NGO[];
    isLoading: boolean;
    onRefreshData: (entity: 'ong') => Promise<void>;
}

export default function TabOngs(props: Props) {
    const [filterStatus, setFilterStaus] = useState<string>('todas   ');
    const [filterNickname, setFilterNickname] = useState();

    const [ongs, setOngs] = useState<NGO[]>(props.dataOngs);

    useEffect(() => {

        if (filterStatus == 'todas') {
            setOngs(props.dataOngs)
        } else {
            // @ts-ignore - status pode ser uppercase/lowercase, melhor padronizar depois
            setOngs(props.dataOngs.filter(ong => ong.status == filterStatus))
        }

    }, [filterStatus, props.dataOngs])


    const handleClickButton = async (uuid: string, status: 'approved' | 'rejected') => {
        try {
            // No backend o status é lowercase: 'pending' | 'approved' | 'rejected'
            const response = await updateOng(uuid, { status: status });

            if (!response) {
                alert(errorOngService || "Erro ao atualizar");
                return;
            }

            alert(`ONG ${status === 'approved' ? 'Aprovada' : 'Rejeitada'} com sucesso!`);
            props.onRefreshData('ong');


        } catch (error) {
            console.error("Erro ao atualizar status da ONG:", error);
        }
    }

    return (
        <>
            {props.isLoading && <Card><p>Carregando...</p></Card>}


            <div className="container-cards">
                <Card></Card>

            </div>


            <Card>
                <div className="container-filters">
                    <Input
                        variant="selection"
                        label="Filtar por Status:"
                        options={[
                            'Todas', 'Aprovada', 'Pendente', 'Rejeitada'
                        ]}
                        style={{ width: '150px' }}
                        onChange={(e) => setFilterStaus(e.target.value.toLowerCase())}
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
                        ongs.map((ong) => (
                            <OngRequestCard key={ong.uuid} ongRequest={ong} onClickButton={handleClickButton} />
                        ))
                    }
                </div>
            </Card>
        </>
    )
}