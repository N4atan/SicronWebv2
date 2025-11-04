import Button from "../Button/Button";
import Card from "../Card/Card";
import './Cart.css'


export default function Cart() {
    return (
        <Card
            titleSection='Carrinho de Doações'
        >
            { itensCart.length == 0 || !itensCart &&
            (
                <p>Seu carrinho está vazio!</p>
            )}
            
            <ul className="cart-list">
            { itensCart.map((item, id) => (
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
                <span className=""> {`R$ ${itensCart.reduce((fprice, item) => {return fprice + item.price}, 0)}`} </span>
            </div>
            

            <Button variant="primary" text="Finalizar Doação" style={{width: '100%', marginBottom: '0.8rem'}}/>
            <Button variant="secondary" text="Limpar Carrinho" style={{width: '100%'}}/>

        </Card>
    )
}



const itensCart = [
    { 
        name: 'Caneta Esferográfica',
        price: 1.00,
        qtd: 3
    },
    { 
        name: 'Caderno 86 Folhas',
        price: 14.99,
        qtd: 2
    },
]