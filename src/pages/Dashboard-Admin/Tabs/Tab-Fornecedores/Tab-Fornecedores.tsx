import { useEffect, useState } from "react";
import SupplierRequestCard from "../../../../components/SupplierRequestCard/SupplierRequestCard";
import { updateSupplier, Supplier, errorSupplierService } from "../../../../services/supplier.service";
import Card from "../../../../components/Card/Card";
import Input from "../../../../components/Inputs/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    dataSuppliers: Supplier[];
    isLoading: boolean;
    onRefreshData: (entity: 'supplier') => Promise<void>;
}

export default function TabFornecedores(props: Props) {
    const [filterStatus, setFilterStatus] = useState<string>('todas');
    const [filterName, setFilterName] = useState<string>('');
    const [debouncedName, setDebouncedName] = useState<string>('');

    const [suppliers, setSuppliers] = useState<Supplier[]>(props.dataSuppliers);

    // Helper: remove acentos e lower case
    const normalizeText = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    // Debounce para o nome
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(filterName);
        }, 500);
        return () => clearTimeout(timer);
    }, [filterName]);

    // Efeito de filtragem
    useEffect(() => {
        let filtered = props.dataSuppliers;

        // 1. Filtro de Status
        if (filterStatus !== 'todas') {
            const statusKeyMap: { [key: string]: string } = {
                'aprovado': 'APPROVED',
                'pendente': 'PENDING',
                'rejeitado': 'REJECTED'
            };
            const targetStatus = statusKeyMap[filterStatus] || filterStatus;
            filtered = filtered.filter(s => s.status === targetStatus);
        }

        // 2. Filtro de Nome
        if (debouncedName) {
            const normalizedSearch = normalizeText(debouncedName);
            filtered = filtered.filter(s => {
                const name = s.companyName ? normalizeText(s.companyName) : '';
                const trade = s.tradeName ? normalizeText(s.tradeName) : '';
                return name.includes(normalizedSearch) || trade.includes(normalizedSearch);
            });
        }

        setSuppliers(filtered);

    }, [filterStatus, debouncedName, props.dataSuppliers])


    const handleClickButton = async (uuid: string, status: 'APPROVED' | 'REJECTED') => {
        if (!uuid) return;

        try {
            const response = await updateSupplier(uuid, { status });

            if (!response) {
                alert(errorSupplierService || "Erro ao atualizar");
                return;
            }

            alert(`Fornecedor ${status === 'APPROVED' ? 'Aprovado' : 'Rejeitado'} com sucesso!`);
            props.onRefreshData('supplier');

        } catch (error) {
            console.error("Erro ao atualizar status do fornecedor:", error);
        }
    }

    return (
        <>
            {props.isLoading && <Card><p>Carregando...</p></Card>}

            <Card>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>

                    {/* Filtro de Nome */}
                    <Input
                        variant="default"
                        label="Filtrar por Empresa:"
                        icon={faMagnifyingGlass}
                        placeholder="Nome ou Fantasia..."
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />

                    {/* Filtro de Status */}
                    <Input
                        variant="selection"
                        label="Status:"
                        options={[
                            'Todas', 'Aprovado', 'Pendente', 'Rejeitado'
                        ]}
                        style={{ width: '150px' }}
                        value={filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                        onChange={(e) => setFilterStatus(e.target.value.toLowerCase())}
                    />
                </div>


                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {suppliers.length === 0 && !props.isLoading && (
                        <p style={{ padding: '20px', color: '#666' }}>Nenhum fornecedor encontrado.</p>
                    )}

                    {
                        suppliers.map((s) => (
                            <SupplierRequestCard key={s.uuid} supplierData={s} onClickButton={handleClickButton} variant="admin" />
                        ))
                    }
                </div>
            </Card>
        </>
    )
}
