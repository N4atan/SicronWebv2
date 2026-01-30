import { useState, useMemo, useEffect } from "react";
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
import { useLocation, useSearchParams } from "react-router-dom";
import { getOngByUuid } from "../services/ong.service";
import { createDonation } from "../services/donation.service";
import { NGO, ViewProduct, DonationPayload } from "../interfaces";
import { Oval } from "react-loader-spinner";
import { dataFormatter } from "../utils/dataFormatter";
import RevealOnScroll from "../components/RevealOnScroll/RevealOnScroll";


export default function PageONG() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const uuidParam = searchParams.get('uuid');
    const nameParam = searchParams.get('nome');


    const [ongData, setOngData] = useState<NGO | undefined>(location.state?.ong as NGO | undefined);


    const [productsList, setProductsList] = useState<ViewProduct[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(!ongData && (!!uuidParam || !!nameParam));
    const [isDonating, setIsDonating] = useState(false);

    const fetchData = async () => {
        // Só mostra loading (geral) se não tiver dados nenhum
        if (!ongData) setIsLoading(true);

        try {
            if (uuidParam) {
                // Prioridade 1: Busca por UUID
                const data = await getOngByUuid(uuidParam);
                if (data) {
                    setOngData(data);
                    updateProductsFromOng(data);
                }

            } else if (nameParam) {
                // Prioridade 2: Busca por Nome Fantasia
                const { getAllOngs } = await import("../services/ong.service");

                const result = await getAllOngs({ trade_name: nameParam });

                if (result && result.length > 0) {
                    // Se não tiver products depth, preciso de busca detalhada
                    if (result[0].uuid) {
                        const detailed = await getOngByUuid(result[0].uuid);
                        if (detailed) {
                            setOngData(detailed);
                            updateProductsFromOng(detailed);
                        } else {
                            setOngData(result[0]);
                            updateProductsFromOng(result[0]);
                        }
                    } else {
                        setOngData(result[0]);
                        updateProductsFromOng(result[0]);
                    }
                }
            }
        } catch (err) {
            console.error("Erro ao buscar ONG:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Se tiver dados iniciais, popula a lista, mas NÃO retorna, pois precisamos validar/atualizar os UUIDs via fetch
        if (ongData) {
            updateProductsFromOng(ongData);
        }

        if (uuidParam || nameParam) {
            fetchData();
        }
    }, [uuidParam, nameParam]);


    const updateProductsFromOng = (ong: NGO) => {
        // @ts-ignore - Products pode vir da relation backend
        if (ong.products && Array.isArray(ong.products)) {
            // @ts-ignore
            // @ts-ignore
            const mappedProducts = ong.products.map((ngoProduct: any) => {

                let avgPrice = 0;
                const sp = ngoProduct.product?.supplierProducts;
                if (sp && Array.isArray(sp) && sp.length > 0) {
                    const prices = sp.map((s: any) => Number(s.price));
                    const sum = prices.reduce((a: number, b: number) => a + b, 0);
                    avgPrice = sum / prices.length;
                }

                return {
                    uuid: ngoProduct.product?.uuid || "",
                    name: ngoProduct.product?.name || "Item",
                    description: ngoProduct.product?.description || "Ajude com a doação deste item.",
                    tag: ngoProduct.product?.category || "Geral",
                    price: avgPrice,
                    qtd: ngoProduct.quantity || 1,
                    collected: ngoProduct.collected_quantity || 0
                };
            });
            setProductsList(mappedProducts);
        } else {
            console.warn("ONG carregada sem lista de produtos:", ong);
        }
    }

    const [tab, setTab] = useState('sobre'); // sobre | doar | contato

    const [cartlist, setCartList] = useState(Array<ViewProduct>());


    const ongName = ongData?.trade_name || ongData?.name || "ONG Genérica";
    const ongArea = ongData?.area || "Geral";
    const ongDescription = ongData?.description || "Descrição não disponível.";
    const ongLocal = ongData?.local || "Local não informado";
    const ongEmail = ongData?.contact_email || "Email não informado";
    const ongPhone = ongData?.phone_number || "Telefone não informado";


    const ongFounded = dataFormatter(ongData?.creation_date);


    const listContactInfo = useMemo(() => [
        {
            icon: faCalendar,
            text: ongFounded,
            subtext: 'Na Plataforma desde'
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
            icon: faLocationDot,
            text: ongPhone,
            subtext: 'Telefone'
        }
    ], [ongEmail, ongPhone]);


    const handleAddToCart = (itemClicado: ViewProduct) => {

        setCartList(prevItems => {



            const itemExistente = prevItems.find(item => item.name === itemClicado.name);

            if (itemExistente) {

                if (itemExistente.qtd >= itemClicado.qtd) {
                    alert('Quantidade necessária máxima atingida!');
                    return prevItems;
                }

                return prevItems.map(item =>
                    item.name === itemClicado.name
                        ? { ...item, qtd: item.qtd + 1 }
                        : item
                );
            } else {

                // IMPORTANTE: Sobrescrever 'qtd' para 1, pois itemClicado.qtd é a META da ONG
                return [...prevItems, { ...itemClicado, qtd: 1 }];
            }
        });
    }

    const handleClearCart = () => {
        setCartList([]);
    }

    const handleCheckout = async () => {
        if (!ongData || !ongData.uuid) {
            alert("Erro: ID da ONG não encontrado.");
            return;
        }

        if (cartlist.length === 0) {
            alert("Sua sacola está vazia.");
            return;
        }

        setIsDonating(true);

        const itemsPayload = cartlist.map(item => ({
            product_uuid: item.uuid,
            quantity: item.qtd
        }));

        try {
            const success = await createDonation({
                ngo_uuid: ongData.uuid,
                items: itemsPayload,
                fileUrl: "https://example.com/receipt-placeholder.jpg"
            });

            if (success) {
                alert("Doação realizada com sucesso! Obrigado.");
                setCartList([]);
                await fetchData(); // Refresh data
            } else {
                alert("Houve um erro ao processar sua doação. Tente novamente.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Erro ao processar doação.");
        } finally {
            setIsDonating(false);
        }
    };

    if (isLoading) {
        return (
            <Card style={{ width: '300px', margin: '2rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Oval
                    height={60}
                    width={60}
                    color="#2BB673"
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#e0e0e0"
                    strokeWidth={4}
                />
                <p>Carregando perfil...</p>
            </Card>
        );
    }

    if (!ongData) {
        return (
            <Card style={{ width: '300px', margin: '2rem auto', textAlign: 'center' }}>
                <p>ONG não encontrada ou não especificada.</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                    Por favor, selecione uma ONG na página Explorar.
                </p>
            </Card>
        );
    }

    return (
        <>


            <RevealOnScroll threshold={0.1}>
                <ProfileCard name={ongName} tags={[ongArea]} />
            </RevealOnScroll>

            <RevealOnScroll threshold={0.1} delay={0.2}>
                <ContainerPage variant={tab == 'doar' ? "a-right" : 'a-left'} >

                    <nav className="tabs-nav">


                        <div className="radio-tab-item">
                            <input
                                type="radio" id="nav-sobre" name="nav-view"
                                value="sobre" checked={tab === 'sobre'}
                                onChange={(e) => setTab(e.target.value)}
                            />
                            <label htmlFor="nav-sobre">Sobre</label>
                        </div>


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
                                <Cart
                                    datalist={cartlist}
                                    onClearCart={handleClearCart}
                                    onCheckout={handleCheckout}
                                    isLoading={isDonating}
                                />
                            </aside>

                            <main>
                                <Card titleSection="Itens Necessários" subtitleSection="Ajude-nos a fazer a diferença.">
                                    {productsList.length > 0 ? (
                                        <ListaItens datalist={productsList} onAddCart={handleAddToCart} />
                                    ) : (
                                        <p style={{ padding: '20px', color: '#777' }}>Esta ONG ainda não cadastrou itens necessários.</p>
                                    )}
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
            </RevealOnScroll >

        </>
    )
}
