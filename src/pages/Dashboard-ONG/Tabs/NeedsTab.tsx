import Card from "../../../components/Card/Card";
import DynamicTable from "../../../components/Table/DynamicTable/DynamicTable";
import { NGO, NGOProduct } from "../../../interfaces";

interface NeedsTabProps {
    ngo: NGO;
    onDelete: (product: NGOProduct) => void;
    onEdit: (product: NGOProduct) => void;
}

export default function NeedsTab({ ngo, onDelete, onEdit }: NeedsTabProps) {
    return (
        <div style={{ padding: '20px' }}>
            <Card titleSection="Necessidades de Doação" subtitleSection="Estes itens ficarão visíveis para doadores.">
                <DynamicTable
                    listData={ngo.products || []}
                    typeData="ngoProducts"
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            </Card>
        </div>
    );
}
