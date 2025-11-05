/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { faBook, faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ListaItens.css'

type Product = {
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number
};

type Props = {
    datalist: Product[];
    onAddCart: (newitem: Product) => void;
};

export default function ListaItens(props: Props){
    

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

            { props.datalist.map((item, index) => {
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

                            <button className="btn-donation"
                                onClick={() => props.onAddCart(item)}
                            >
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