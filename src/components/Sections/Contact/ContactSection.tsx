import "./ContactSection.css";
import ContatoForm from '../../Forms/Contato/Contato';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2 className="contact-title">Fique por dentro do nosso impacto</h2>
          <p className="contact-desc">
            Receba histórias mensais de transformação e descubra novas oportunidades de voluntariado perto de você.
          </p>
        </div>

        <div className="contact-right">
          {/* Reusing existing form logic but wrapper styled differently */}
          {/* Functional N8N Contact Form */}
          <div className="form-wrapper-dark">
            <ContatoForm recipientEmail="contato@sicron.com" />
          </div>
        </div>
      </div>
    </section>
  );
}
