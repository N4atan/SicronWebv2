import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { Supplier } from "../../../interfaces";
import { getAllSuppliers } from "../../../services/supplier.service";
import SupplierRequestCard from "../../../components/SupplierRequestCard/SupplierRequestCard";
import { Oval } from "react-loader-spinner";

export default function SuppliersTab() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const response = await getAllSuppliers();
            setSuppliers(response);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (isLoading) {
        return (
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <Oval color="#2BB673" height={60} width={60} />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card titleSection="Fornecedores" subtitleSection="Encontre parceiros para sua ONG.">
                {suppliers.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Nenhum fornecedor encontrado.</p>
                ) : (
                    suppliers.map((supplier) => (
                        <SupplierRequestCard
                            key={supplier.uuid}
                            supplierData={supplier}
                            variant="public"
                            onClickButton={(uuid, status) => {
                                console.log('Ação:', status, 'para:', uuid);
                            }}
                        />
                    ))
                )}
            </Card>
        </div>
    );
}