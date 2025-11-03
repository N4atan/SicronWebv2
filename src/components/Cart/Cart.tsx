import Card from "../Card/Card";


export default function Cart() {
    return (
        <Card
            titleSection='Carrinho de Doações'
        >
            { itensCart.length == 0 || !itensCart &&
            (
                <p>Seu carrinho está vazio!</p>
            )}

            { itensCart.map((item, id) => (
                <div className="item-cart" key={id}>

                    <div className="item-cart-row">
                        <span>{item.name}</span>
                        <span>{`${item.price * item.qtd}`}</span>
                    </div>

                    <span>{`${item.qtd} X ${item.price}`}</span>
                </div>
            ))}

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