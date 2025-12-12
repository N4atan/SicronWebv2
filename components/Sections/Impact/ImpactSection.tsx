import "./ImpactSection.css";
import '../../VideoPlayer/VideoPlayer';

import kidsDonation from '../../../assets/videos/Kids-donation.mp4';
import VideoPlayer from "../../VideoPlayer/VideoPlayer";

export default function ImpactSection() {
    return (
        <section className="impact-section">
            <VideoPlayer
                src={kidsDonation}
                title="Conectando Você a Quem Precisa"
                subtitle="Tecnologia e logística para transformar doações em entregas garantidas"
                text="É para gerar momentos como este que existimos. Quando você escolhe um item na nossa plataforma, nós garantimos a compra e o envio , transformando sua doação digital em um impacto físico e visível na vida de quem precisa."
            />
        </section>
    );
}
