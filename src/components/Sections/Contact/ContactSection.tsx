import "./ContactSection.css";
import ContatoForm from '../../Forms/Contato/Contato';

export default function ContactSection() {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-container">
        <div className="contact-left animate-fade-up">
          <h2 id="contact-heading" className="contact-title">Fique por dentro do nosso impacto</h2>
          <p className="contact-desc">
            Receba histórias mensais de transformação e descubra novas oportunidades de voluntariado perto de você.
          </p>
        </div>

        <div className="contact-right">
          {/* Reusing existing form logic but wrapper styled differently */}
          {/* Functional N8N Contact Form */}
          <div className="form-wrapper-dark animate-fade-up stagger-1">
            <ContatoForm recipientEmail="contato@sicron.com" />
          </div>
        </div>
      </div>
    </section>
  );
}

