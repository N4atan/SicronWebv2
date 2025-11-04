/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { faBook, faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ListaItens.css'



export default function ListaItens(){
    const [ datalist, setDataList ] = useState([
        {
            name: 'Kit Material Escolar',
            description: 'Caneta, Cadernos, Estojo, Lápis, Borracha, Apontador, Mochila',
            tag: 'Educação',
            price: 120.00

        },
        {
            name: 'Kit Primeiros Socorros',
            description: 'Kit completo com medicamentos básicos e materiais de primeiros socorros',
            tag: 'Saúde',
            price: 80.00

        },
    ])

    function getIcon(tag: string) {
        switch (tag) {
            case 'Educação':
                return faBook;
            case 'Saúde':
                return faKitMedical;
            default:
                return undefined;
        }
    }


    return (
        <>
            <ul className="lista-itens">

            { datalist.map((item, index) => {
                const icon = getIcon(item.tag);
                return (
                    <li key={index} className="container-li">
                        <div className="container-icon">
                            {icon && <FontAwesomeIcon icon={icon}  />}
                        </div>

                        <div className="container-texts">
                            <div>
                                <span className="i-name" > {item.name} </span>
                                <span className="i-price" > {`R$ ${item.price}`} </span>
                            </div>

                            <span className="i-desc" > {item.description} </span>

                            <button className="btn-donation">
                                <FontAwesomeIcon icon={faHeart} />
                                Doar
                            </button>

                        </div>
                    </li>
                );
            })}

            </ul>

        </>
    )
}