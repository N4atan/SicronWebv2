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

export default function PageONG() {
    const [ tab, setTab ] = useState('sobre'); // sobre | doar | contato


    return (
        <>
            <Header />

            <ProfileCard name="ONG Genérica" tags={['Animais']} />

            <ContainerPage variant={tab == 'doar' ? "a-right" : 'a-left'} >

                <nav className="tabs-nav">

                    {/* --- Opção 1: Sobre --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-sobre" name="nav-view"
                            value="sobre" checked={tab === 'sobre'}
                            onChange={(e) => setTab(e.target.value)}
                        />
                        <label htmlFor="nav-sobre">Sobre</label>
                    </div>

                    {/* --- Opção 2: Doar --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-doar" name="nav-view"
                            value="doar" checked={tab === 'doar'}
                            onChange={(e) => setTab(e.target.value)}
                        />
                        <label htmlFor="nav-doar">Doar</label>
                    </div>

                    {/* --- Opção 3: Contato --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-contato" name="nav-view"
                            value="contato" checked={tab === 'contato'}
                            onChange={(e) => setTab(e.target.value)}
                        />
                        <label htmlFor="nav-contato">Contato</label>
                    </div>
                </nav>


                { tab == 'sobre' && (
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

                { tab == 'doar' && (
                    <>
                    <aside>
                        <Cart />
                    </aside>

                    <main>
                        <Card titleSection="Itens Necessários" subtitleSection="Ajude-nos a fazer a diferença.">
                            <ListaItens />
                        </Card>
                    </main>
                    </>
                )}

                { tab == 'contato' && (
                    <>
                    <aside>
                        <InfoContactCard listContact={listContact2}  />
                    </aside>

                    <main>
                        <Card titleSection="Entre em Contato" subtitleSection="">
                            <ContatoForm />
                        </Card>
                    </main>
                    </>
                )}

            </ContainerPage>
        
        </>
    )
}


const listContact =[
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

const listContact2 =[
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