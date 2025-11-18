import Input from "../../components/Inputs/Input/Input";


export default function ExploreOngs() {




    return (
        <main>
        
        <aside className="container-filters">
            <h2>Filtros</h2>

            <p>Nome da ONG</p>
            <input type="text" name="ong-name" id="" />

            <p>Foco Principal</p>
            <select name="ong-focus" id="" >
                <option value="" disabled selected >Selecione o Foco Principal</option>
                <option value="all">Deixar áreas padronizadas</option>
            </select>

            <p>Localização</p>
            <input type="text" name="ong-location" id="" />
        </aside>

        <section className="container-results">

        </section>
        
        </main>
    )
}