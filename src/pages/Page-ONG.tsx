import { useState } from "react";
import ContainerPage from "../components/ContainerPage/ContainerPage";
import Header from "../components/Header/Header";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import InfoContactCard from "../components/InfoContactCard/InfoContactCard";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card/Card";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ContatoForm from "../components/Forms/Contato/Contato";
import Cart from "../components/Cart/Cart";
import ListaItens from "../components/ListaItens/ListaItens";
import RevealOnScroll from "../components/RevealOnScroll/RevealOnScroll";

type Product = {
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number
};

export default function PageONG() {
    const [tab, setTab] = useState('sobre'); // sobre | doar | contato
    const [productsList] = useState(Array<Product>(
        {
            name: 'Kit Material Escolar',
            description: 'Caneta, Cadernos, Estojo, Lápis, Borracha, Apontador, Mochila',
            tag: 'Educação',
            price: 120.00,
            qtd: 1
        },
        {
            name: 'Kit Primeiros Socorros',
            description: 'Kit completo com medicamentos básicos e materiais de primeiros socorros',
            tag: 'Saúde',
            price: 80.00,
            qtd: 1
        },
    ))

    const [cartlist, setCartList] = useState(Array<Product>());

    const handleAddToCart = (itemClicado: Product) => {

        setCartList(prevItems => {
            // 1. O item já existe no carrinho?
            const itemExistente = prevItems.find(item => item.name === itemClicado.name);

            if (itemExistente) {
                // 2. Se sim, mapeia o array e atualiza a quantidade (de forma imutável)
                return prevItems.map(item =>
                    item.name === itemClicado.name
                        ? { ...item, qtd: item.qtd + 1 } // Incrementa
                        : item
                );
            } else {
                // 3. Se não, adiciona o novo item com quantidade 1
                return [...prevItems, { ...itemClicado, quantity: 1 }];
            }
        });
    }

    const handleClearCart = () => {
        setCartList([]);
    }

    return (
        <>
            <RevealOnScroll><Header /></RevealOnScroll>

            <RevealOnScroll threshold={0.1}>
                <ProfileCard name="ONG Genérica" tags={['Animais']} />
            </RevealOnScroll>

            <RevealOnScroll threshold={0.1} delay={0.2}>
                <ContainerPage variant={tab == 'doar' ? "a-right" : 'a-left'} >

                    <nav className="tabs-nav">
                        {/* ... keep tabs as is ... */}
                        <div className="radio-tab-item">
                            <input
                                type="radio" id="nav-sobre" name="nav-view"
                                value="sobre" checked={tab === 'sobre'}
                                onChange={(e) => setTab(e.target.value)}
                            />
                            <label htmlFor="nav-sobre">Sobre</label>
                        </div>
                        {/* ... (other tabs) ... */}
                        <div className="radio-tab-item">
                            <input
                                type="radio" id="nav-doar" name="nav-view"
                                value="doar" checked={tab === 'doar'}
                                onChange={(e) => setTab(e.target.value)}
                            />
                            <label htmlFor="nav-doar">Doar</label>
                        </div>
                        <div className="radio-tab-item">
                            <input
                                type="radio" id="nav-contato" name="nav-view"
                                value="contato" checked={tab === 'contato'}
                                onChange={(e) => setTab(e.target.value)}
                            />
                            <label htmlFor="nav-contato">Contato</label>
                        </div>
                    </nav>


                    {tab == 'sobre' && (
                        <>
                            <aside>
                                <InfoContactCard listContact={listContact} />
                            </aside>

                            <main>
                                <Card titleSection="Nossa Missão" >
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptatum at quia ratione? Enim animi blanditiis aspernatur et inventore voluptate ex eveniet, praesentium aperiam ut in ad deleniti voluptatum autem!</p>
                                </Card>
                            </main>
                        </>
                    )}

                    {tab == 'doar' && (
                        <>
                            <aside>
                                <Cart datalist={cartlist} onClearCart={handleClearCart} />
                            </aside>

                            <main>
                                <Card titleSection="Itens Necessários" subtitleSection="Ajude-nos a fazer a diferença.">
                                    <ListaItens datalist={productsList} onAddCart={handleAddToCart} />
                                </Card>
                            </main>
                        </>
                    )}

                    {tab == 'contato' && (
                        <>
                            <aside>
                                <InfoContactCard listContact={listContact2} />
                            </aside>

                            <main>
                                <Card titleSection="Entre em Contato" subtitleSection="">
                                    <ContatoForm recipientEmail={listContact2[0].text} />
                                </Card>
                            </main>
                        </>
                    )}

                </ContainerPage>
            </RevealOnScroll>

        </>
    )
}


const listContact = [
    {
        icon: faCalendar,
        text: 'AAAA',
        subtext: 'Fundada'
    },
    {
        icon: faLocationDot,
        text: 'Cidade, Estado',
        subtext: 'Localização'
    }
];

const listContact2 = [
    {
        icon: faEnvelope,
        text: 'seu@email.com',
        subtext: 'Email'
    },
    {
        icon: faLocationDot,
        text: 'seu@email.com',
        subtext: 'Email'
    }
];