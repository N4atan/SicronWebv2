import { useState } from "react";
import ContainerPage from "../components/ContainerPage/ContainerPage";
import Header from "../components/Header/Header";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import InfoContactCard from "../components/InfoContactCard/InfoContactCard";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card/Card";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ContatoForm from "../components/Forms/Contato/Contato";


export default function PageONG() {
    const [ sideView, seSidetView ] = useState('a-left');
    const [ view, setView ] = useState('contato'); // sobre | doar | contato 

    function handleChangeView(v: 'sobre' | 'doar' | 'contato') {
        setView(v);
    }


    return (
        <>
            <Header />

            <ProfileCard 
                name="ONG Genérica"
                tags={['Animais']}
            />
            
            <ContainerPage
                variant={sideView}
            >

               <nav className="tabs-nav"> 
                    
                    {/* --- Opção 1: Sobre --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-sobre" name="nav-view"
                            value="sobre" checked={view === 'sobre'}
                            onChange={(e) => setView(e.target.value)}
                        />
                        <label htmlFor="nav-sobre">Sobre</label>
                    </div>

                    {/* --- Opção 2: Doar --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-doar" name="nav-view"
                            value="doar" checked={view === 'doar'}
                            onChange={(e) => setView(e.target.value)}
                        />
                        <label htmlFor="nav-doar">Doar</label>
                    </div>

                    {/* --- Opção 3: Contato --- */}
                    <div className="radio-tab-item">
                        <input 
                            type="radio" id="nav-contato" name="nav-view"
                            value="contato" checked={view === 'contato'}
                            onChange={(e) => setView(e.target.value)}
                        />
                        <label htmlFor="nav-contato">Contato</label>
                    </div>
                </nav>


                { sideView != 'a-no' &&
                <aside>

                    { view == 'sobre' &&

                    <InfoContactCard listContact={listContact} />

                    }

                    {  view == 'contato' &&
                    
                    <InfoContactCard listContact={listContact2} />
                    
                    }

                </aside>
                }

                <main>

                    { view == 'sobre' &&

                    <Card
                        titleSection="Nossa Missão"
                    >
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, molestias. Aperiam ex nihil totam. Est numquam similique vero sit? Totam, eaque commodi ut maxime provident ullam sit fugit hic quia?</p>
                    </Card>

                    }

                    {  view == 'contato' &&
                    
                    <Card
                        titleSection="Entre em Contato"
                        subtitleSection="Tire suas dúvidas ou saiba como ajudar"
                    >
                        <ContatoForm />
                    </Card>
                    
                    }

                </main>

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