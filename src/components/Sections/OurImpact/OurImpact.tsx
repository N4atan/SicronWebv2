import "./OurImpact.css";
import { useEffect, useState } from "react";
import { getAllOngs } from "../../../services/ong.service";
import { NGO } from "../../../interfaces";
import imgMain from "../../../assets/images/mulheres.jpg";
import img1 from "../../../assets/images/Kid.jpg";
import img2 from "../../../assets/images/homem.png";
import img3 from "../../../assets/images/mundo-origami-papel.jpg"; // Placeholder if needed
import OngRequestCard from "../../OngRequestCard/OngRequestCard";

const images = [img1, img3, img2];

export default function OurImpact() {
    const [ngos, setNgos] = useState<NGO[]>([]);

    useEffect(() => {
        const fetchOngs = async () => {
            // Buscando direto as aprovadas via filtro da API
            const approvedOngs = await getAllOngs({ status: 'approved' });

            // Ordenando por data de criação (mais recentes primeiro)
            const sortedOngs = approvedOngs.sort((a, b) => {
                const dateA = a.creation_date ? new Date(a.creation_date).getTime() : 0;
                const dateB = b.creation_date ? new Date(b.creation_date).getTime() : 0;
                return dateB - dateA;
            });

            // Pegando apenas as 3 últimas
            setNgos(sortedOngs.slice(0, 3));
        };

        fetchOngs();
    }, []);

    return (
        <section className="featured-section">
            <div className="featured-header">
                <h2 className="title-section">ONGs em Destaque</h2>
                <a href="/ongs" className="view-all-link">Ver todas &rarr;</a>
            </div>

            {ngos.map((ngo) => (
                <div className="ngo-grid">
                    <OngRequestCard 
                        key={ngo.uuid}
                        ongRequest={ngo}
                    />
                </div>
            ))}
            
        </section>
    );
}
