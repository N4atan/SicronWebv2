import "./ImpactSection.css";
import '../../VideoPlayer/VideoPlayer';

import kidsDonation from '../../../assets/videos/Kids-donation.mp4';
import VideoPlayer from "../../VideoPlayer/VideoPlayer";

export default function ImpactSection() {
    return (
        <section className="impact-section">
            <VideoPlayer
                src={kidsDonation}
                title="Conheça Nossa História"
                subtitle="Veja como estamos mudando a vida de milhares de pessoas ao redor do país"
                text="Nosso trabalho só é possível graças ao apoio de pessoas como você. Juntos, podemos fazer ainda mais pela educação e bem-estar do mundo."
            />
        </section>
    );
}
