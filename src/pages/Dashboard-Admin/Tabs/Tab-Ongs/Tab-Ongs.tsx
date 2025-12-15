import { useEffect, useState } from "react";
import OngRequestCard from "../../../../components/OngRequestCard/OngRequestCard";
import { updateOng, NGO, errorOngService } from "../../../../services/ong.service";
import Card from "../../../../components/Card/Card";
import './Tab-Ongs.css';
import Input from "../../../../components/Inputs/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    dataOngs: NGO[];
    isLoading: boolean;
    onRefreshData: (entity: 'ong') => Promise<void>;
}

export default function TabOngs(props: Props) {
    const [filterStatus, setFilterStatus] = useState<string>('todas');
    const [filterName, setFilterName] = useState<string>('');
    const [filterArea, setFilterArea] = useState<string>('todas');
    const [debouncedName, setDebouncedName] = useState<string>('');

    const [ongs, setOngs] = useState<NGO[]>(props.dataOngs);

    // Debounce para o nome
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(filterName);
        }, 500);
        return () => clearTimeout(timer);
    }, [filterName]);

    // Efeito unificado de filtragem (Client-Side, pois Admin já recebe tudo)
    useEffect(() => {
        let filtered = props.dataOngs;

        // 1. Filtro de Status
        if (filterStatus !== 'todas') {
            const statusKeyMap: { [key: string]: string } = {
                // mapeia user friendly -> backend value
                'aprovada': 'approved',
                'pendente': 'pending',
                'rejeitada': 'rejected'
            };
            const targetStatus = statusKeyMap[filterStatus] || filterStatus;

            filtered = filtered.filter(ong => ong.status === targetStatus);
        }

        // 2. Filtro de Nome (Debounced)
        if (debouncedName) {
            const lowerName = debouncedName.toLowerCase();
            filtered = filtered.filter(ong =>
                (ong.trade_name && ong.trade_name.toLowerCase().includes(lowerName)) ||
                (ong.name && ong.name.toLowerCase().includes(lowerName))
            );
        }

        // 3. Filtro de Área
        if (filterArea !== 'todas') {
            filtered = filtered.filter(ong => ong.area === filterArea);
        }

        setOngs(filtered);

    }, [filterStatus, debouncedName, filterArea, props.dataOngs])


    const handleClickButton = async (uuid: string, status: 'approved' | 'rejected') => {
        if (!uuid) {
            alert("Erro: UUID da ONG não encontrado.");
            return;
        }
        try {
            // No backend o status é lowercase: 'pending' | 'approved' | 'rejected'
            const response = await updateOng(uuid, { status: status });

            if (!response) {
                alert(errorOngService || "Erro ao atualizar");
                return;
            }

            alert(`ONG ${status === 'approved' ? 'Aprovada' : 'Rejeitada'} com sucesso!`);
            props.onRefreshData('ong');


        } catch (error) {
            console.error("Erro ao atualizar status da ONG:", error);
        }
    }

    return (
        <>
            {props.isLoading && <Card><p>Carregando...</p></Card>}

            <div className="container-cards">
            </div>

            <Card>
                <div className="container-filters">

                    {/* Filtro de Nome */}
                    <Input
                        variant="default"
                        label="Filtrar por Nome:"
                        icon={faMagnifyingGlass}
                        placeholder="Digite o Nome..."
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />

                    {/* Filtro de Status */}
                    <Input
                        variant="selection"
                        label="Status:"
                        options={[
                            'Todas', 'Aprovada', 'Pendente', 'Rejeitada'
                        ]}
                        style={{ width: '150px' }}
                        value={filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} // Capitalize visual
                        onChange={(e) => setFilterStatus(e.target.value.toLowerCase())}
                    />

                    {/* Filtro de Causa */}
                    <Input
                        variant="selection"
                        label="Causa:"
                        options={['Todas', 'Assistência Social', 'Saúde', 'Educação e Pesquisa', 'Meio Ambiente']}
                        style={{ width: '180px' }}
                        onChange={(e) => setFilterArea(e.target.value === 'Todas' ? 'todas' : e.target.value)}
                    />
                </div>


                <div className="container-ongs">
                    {ongs.length === 0 && !props.isLoading && (
                        <p style={{ padding: '20px', color: '#666' }}>Nenhuma ONG encontrada com esses filtros.</p>
                    )}

                    {
                        ongs.map((ong) => (
                            <OngRequestCard key={ong.uuid} ongRequest={ong} onClickButton={handleClickButton} variant="admin" />
                        ))
                    }
                </div>
            </Card>
        </>
    )
}