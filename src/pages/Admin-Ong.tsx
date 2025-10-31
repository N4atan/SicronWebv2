import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import { useState } from "react";


export default function AdminOng() {
    return (
        <>
            <Header />


            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', height: '150px'  }}>


                <Card titleSection="Total de Itens" style={{width: '300px'}}> 
                    <p>2</p>
                </Card>

                <Card titleSection ="Valor Total Necessário" style={{width: '300px'}}>
                    <p>R$ 18400.00</p>
                </Card>

                <Card titleSection="Valor Total Recebido" style={{width: '300px'}}>
                    <p>R$ 7800.00</p>
                </Card>


            </div>
        

        </>
    )
}