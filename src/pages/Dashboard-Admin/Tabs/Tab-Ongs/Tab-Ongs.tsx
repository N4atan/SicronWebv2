import { useState } from "react";
import OngRequestCard from "../../../../components/OngRequestCard/OngRequestCard";
import { SimplifiedOng } from "../../../../services/api";
import Card from "../../../../components/Card/Card";
import './Tab-Ongs.css';

type Props = {
    dataOngs: SimplifiedOng[];
}

export default function TabOngs(props: Props) {
    const [ dataOngs, setDataOngs ] = useState<SimplifiedOng[]>(props.dataOngs || []);

    return (
        <>
        <div className="container-cards">
            <Card>
                <span>Number</span>
                <p>Cadastradas</p>
            </Card>

            <Card>
                <span>Number</span>
                <p>Pendentes</p>
            </Card>

            <Card>
                <span>Number</span>
                <p>Aceitas</p>
            </Card>

            <Card>
                <span>Number</span>
                <p>Rejeitadas</p>
            </Card>

            
        </div>

        
        <div className="container-ongs">
        {
            dataOngs.map((ong) => (
                <OngRequestCard ongRequest={ong} />                            
            ))
        } 
        </div>
        </>
    )
}