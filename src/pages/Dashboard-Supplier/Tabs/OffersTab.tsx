import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import DynamicTable from "../../../components/Table/DynamicTable/DynamicTable";
import { Supplier, SupplierProduct } from "../../../interfaces";

interface OffersTabProps {
    supplier: Supplier;
    onDelete: (product: SupplierProduct) => void;
    onEdit: (product: SupplierProduct) => void;
    onAddClick: () => void;
}

export default function OffersTab({ supplier, onDelete, onEdit, onAddClick }: OffersTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    text="+ Nova Oferta"
                    onClick={onAddClick}
                    variant="primary"
                    style={{ width: '200px' }}
                />
            </div>

            <Card
                titleSection="Meus Produtos à Venda"
                subtitleSection="Estes produtos ficarão visíveis para as ONGs."
            >
                <DynamicTable
                    listData={supplier.products || []}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    typeData="supplier"
                />
            </Card>
        </div>
    );
}
