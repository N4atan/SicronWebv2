import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Card from "../Card/Card";
import './Cart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ViewProduct } from "../../interfaces";

type Props = {
    datalist: Array<ViewProduct>;
    onClearCart: () => void;
    onCheckout?: () => void;
    isLoading?: boolean;
}

export default function Cart(props: Props) {

    // Calculando o valor total
    const fprice = props.datalist.reduce((acc, item) => { return acc + (item.price * item.qtd) }, 0).toFixed(2);

    return (
        <Card
            titleSection='Caxinha de Doações'
        >
            {props.datalist.length == 0 &&
                (
                    <div className="container-empty">
                        <FontAwesomeIcon icon={faBoxOpen} size={"2x"} color="#333" />
                        <p>Sua caxinha está vazia!</p>
                    </div>
                )}

            {props.datalist.length != 0 && (
                <>
                    <ul className="cart-list">
                        {props.datalist.map((item, id) => (
                            <li key={id}>
                                <div className="item-cart" >

                                    <div className="item-cart-row">
                                        <span className="item-name"> {item.name} </span>
                                        <span className="item-fprice"> {`R$ ${(item.price * item.qtd).toFixed(2)}`} </span>
                                    </div>

                                    <span className="item-details"> {`${item.qtd} x R$ ${item.price.toFixed(2)}`} </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="cart-footer">
                        <span className="">Total</span>
                        <span className=""> {`R$ ${fprice}`} </span>
                    </div>


                    <Button
                        variant="primary"
                        text={props.isLoading ? "Processando..." : "Finalizar Doação"}
                        style={{ width: '100%', marginBottom: '0.8rem', opacity: props.isLoading ? 0.7 : 1 }}
                        onClick={props.onCheckout}
                        disabled={props.isLoading}
                    />
                    <Button variant="secondary" text="Limpar Caixinha" style={{ width: '100%' }} onClick={props.onClearCart} />
                </>
            )}

        </Card>
    )
}

