import Button from "../Button/Button";
import Card from "../Card/Card";
import './Cart.css'

type Product = {
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number
};

type Props = {
    datalist: Array<Product>;
    onClearCart: () => void;
}

export default function Cart(props: Props) {

    // Calculando o valor total
    const fprice = props.datalist.reduce((acc, item) => {return acc + (item.price * item.qtd)}, 0).toFixed(2);

    return (
        <Card
            titleSection='Carrinho de Doações'
        >
            { props.datalist.length == 0  &&
            (
                <p>Seu carrinho está vazio!</p>
            )}

            { props.datalist.length != 0 && (
                <>
                <ul className="cart-list">
            { props.datalist.map((item, id) => (
                <li key={id}>
                    <div className="item-cart" >

                        <div className="item-cart-row">
                            <span className="item-name"> {item.name} </span>
                            <span className="item-fprice"> {`R$ ${item.price * item.qtd}`} </span>
                        </div>

                        <span className="item-details"> {`${item.qtd} x R$ ${item.price}`} </span>
                    </div>
                </li>
            ))}
            </ul>
            
            <div className="cart-footer">
                <span className="">Total</span>
                <span className=""> {`R$ ${fprice}`} </span>
            </div>
            

            <Button variant="primary" text="Finalizar Doação" style={{width: '100%', marginBottom: '0.8rem'}}/>
            <Button variant="secondary" text="Limpar Carrinho" style={{width: '100%'}} onClick={props.onClearCart}/>
                </>
            )}

        </Card>
    )
}

