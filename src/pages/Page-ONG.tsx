import { useState, useMemo } from "react";
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
import { useLocation } from "react-router-dom";
import { NGO } from "../services/ong.service";

type Product = {
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number
};

export default function PageONG() {
    const location = useLocation();

    // Tenta obter a ONG do location state (vindo do Explorar/Card)
    // Se não tiver, pode-se implementar um fetch pelo ID da URL (TODO futuro)
    const ongData = location.state?.ong as NGO | undefined;

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

    // Helpers para formatar dados da ONG
    const ongName = ongData?.trade_name || ongData?.name || "ONG Genérica";
    const ongArea = ongData?.area || "Geral";
    const ongDescription = ongData?.description || "Descrição não disponível.";
    const ongLocal = ongData?.local || "Local não informado";
    const ongEmail = ongData?.contact_email || "Email não informado";
    const ongPhone = ongData?.phone_number || "Telefone não informado";

    // Formata data de criação
    const ongFounded = useMemo(() => {
        if (!ongData?.created_at) return "Data desconhecida";
        try {
            return new Date(ongData.created_at).toLocaleDateString('pt-BR');
        } catch { return "Data inválida"; }
    }, [ongData?.created_at]);


    // Listas de contato dinâmicas
    const listContactInfo = useMemo(() => [
        {
            icon: faCalendar,
            text: ongFounded,
            subtext: 'Fundada em'
        },
        {
            icon: faLocationDot,
            text: ongLocal,
            subtext: 'Localização'
        }
    ], [ongFounded, ongLocal]);

    const listContactMethods = useMemo(() => [
        {
            icon: faEnvelope,
            text: ongEmail,
            subtext: 'Email'
        },
        {
            icon: faLocationDot, // Poderia ser icone de telefone se tivesse importado
            text: ongPhone,
            subtext: 'Telefone' // Mudado de 'Email' que estava duplicado
        }
    ], [ongEmail, ongPhone]);


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
            <Header />

            <ProfileCard name={ongName} tags={[ongArea]} />

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


                {tab == 'sobre' && (
                    <>
                        <aside>
                            <InfoContactCard listContact={listContactInfo} />
                        </aside>

                        <main>
                            <Card titleSection="Nossa Missão" >
                                <p style={{ whiteSpace: 'pre-line' }}>{ongDescription}</p>
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
                            <InfoContactCard listContact={listContactMethods} />
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