/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { faBook, faKitMedical, faUtensils, faSoap, faShirt, faCouch, faLaptop, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ListaItens.css'

type Product = {
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number;
    collected?: number;
};

type Props = {
    datalist: Product[];
    onAddCart: (newitem: Product) => void;
};

export default function ListaItens(props: Props) {


    function getIcon(tag: string) {
        switch (tag) {
            case 'Educação': return faBook;
            case 'Saúde': return faKitMedical;
            case 'Alimentação': return faUtensils;
            case 'Higiene': return faSoap;
            case 'Vestuário': return faShirt;
            case 'Móveis': return faCouch;
            case 'Tecnologia': return faLaptop;
            default: return faBoxOpen;
        }
    }


    return (
        <>
            <ul className="lista-itens">

                {props.datalist.map((item, index) => {
                    const icon = getIcon(item.tag);

                    const meta = item.qtd || 1;
                    const doado = item.collected || 0;
                    const percent = Math.min((doado / meta) * 100, 100);

                    return (
                        <li key={index} className="container-li">
                            <div className="container-icon">
                                {icon && <FontAwesomeIcon icon={icon} />}
                            </div>

                            <div className="container-texts">
                                <div>
                                    <span className="i-name" > {item.name} </span>
                                    <span className="i-price" > {`R$ ${item.price.toFixed(2)}`} </span>
                                </div>

                                <span className="i-desc" > {item.description} </span>

                                {/* Barra de Progresso */}
                                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span>Doado: {doado}</span>
                                        <span>Meta: {meta}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${percent}%`,
                                            height: '100%',
                                            background: '#2BB673', // Verde se completou, laranja senão
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </div>

                                <button className="btn-donation"
                                    onClick={() => props.onAddCart(item)}
                                    style={{ marginTop: '15px' }} // Espaço extra
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