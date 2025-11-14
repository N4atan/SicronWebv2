import "./ImpactSection.css";
import '../../VideoPlayer/VideoPlayer';

import prVideo from '../../../assets/videos/pr.mp4';
import VideoPlayer from "../../VideoPlayer/VideoPlayer";

export default function ImpactSection() {
    return (
        <section className="impact-section">
            <VideoPlayer src={prVideo} title="Conheça Nossa História" subtitle="Veja como estamos mudando a vida de milhares de crianças ao redor do país" text="Nosso trabalho só é possível graças ao apoio de pessoas como você. Juntos, podemos fazer ainda mais pela educação e bem-estar das nossas crianças."/>
        </section>
    );
}