import "./ContactSection.css";
import ContatoForm from '../../Forms/Contato/Contato';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <h2 className="title-section">Junte-se à nós!</h2>
        <p className="subtitle-section">
          Seja doador, ONG ou fornecedor — juntos podemos criar um impacto real.
          Cadastre-se agora e ajude a transformar vidas com transparência e eficiência.
        </p>
      </div>

      <div className="contact-right">
        <ContatoForm />
      </div>
    </section>
  );
}
