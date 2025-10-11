import "./About.css"
import Header from "../components/Header";
import mundoOrigami from "../assets/images/mundo-origami-papel.jpg";
import internetIcon from "../assets/icons/internet.png";
import emailIcon from "../assets/icons/email.png";

export default function Sobre() {
  return (
    <>
    <Header />
      <main>
        {/* Seção SICRON */}
        <section className="Secao-doadores">
          <div className="Container">
            <div className="Apresentação_conteudo">
              {/* Texto */}
              <div className="Texto-conteudoDoador">
                <h1>SICRON</h1>
                <p>
                  A SICRON surgiu como um projeto acadêmico,
                  <br />
                  com um propósito real: transformar a solidariedade.
                  <br />
                  Durante nossa pesquisa, vimos uma grande carência.
                  <br />
                  Faltava transparência nas plataformas de doação.
                  <br />
                  Muitas não mostram o destino real dos recursos.
                  <br />
                  Criamos esta solução para mudar esse cenário.
                  <br />
                  Queremos dar voz ativa às ONGs brasileiras,
                  <br />
                  permitindo que exponham suas reais necessidades.
                  <br />
                  Aos doadores, oferecemos um meio confiável,
                  <br />
                  seguro, direto e com rastreabilidade total.
                  <br />
                  Cada contribuição pode ser claramente vista.
                  <br />
                  Ajudar se torna simples, transparente e justo.
                  <br />
                  SICRON: solidariedade com propósito real.
                </p>
              </div>

              {/* Imagem */}
              <div className="Imagem-conteudo">
                <img src={mundoOrigami} alt="Conectando doadores" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="BotoesDoacao">
          <a href="#" className="Botao">Seja um doador!</a>
          <a href="#" className="Botao">Receba Doações</a>
        </div>

        <div className="contato-container">
          <div className="contato-item">
            <img src={internetIcon} alt="internet" className="contato-icone" />
            <span className="contato-texto">www.sicron.org.br</span>
          </div>

          <div className="contato-item">
            <img src={emailIcon} alt="email" className="contato-icone" />
            <span className="contato-texto">team@sicron.org</span>
          </div>
        </div>
      </footer>
    </>
  );
}
