import { faPencil, faTrash, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";


type Props = {
    typeData: string;
    listData: Array<any>,
    onEdit: (obj: any, type: string) => void,
    onDelete: (obj: any, type: string) => void
}


export default function DynamicTable(props: Props) {
    const data = Array.isArray(props.listData) ? props.listData : [];

    let listKeys = data.length > 0 ? Object.keys(data[0]) : [];

    // Remove keys indesejadas da visualização (Senha, IDs internos, Campos longos)
    const hiddenKeys = ['uuid', 'id', 'password', 'previousPassword', 'previous_password', 'manager_uuid'];

    // Filtra chaves globais
    listKeys = listKeys.filter(key => !hiddenKeys.includes(key));

    // Filtros específicos por tipo
    if (props.typeData === 'ong') {
        // Remove descrição longa que quebra o layout
        listKeys = listKeys.filter(key => !['description', 'objetivo'].includes(key));
    }


    const HEADER_MAP: Record<string, string> = {
        name: 'Razão Social',
        trade_name: 'Nome Fantasia',
        cnpj: 'CNPJ',
        area: 'Área de Atuação',
        wallet: 'Carteira',
        local: 'Localização',
        phone_number: 'Telefone',
        contact_email: 'E-mail',
        created_at: 'Criado em',
        status: 'Status',
        username: 'Usuário',
        email: 'E-mail',
        role: 'Perfil'
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '800px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                        {listKeys.map((key) => (
                            <th key={key} style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                                {HEADER_MAP[key] || key.replace(/_/g, ' ')}
                            </th>
                        ))}


                    </tr>
                </thead>

                <tbody>
                    {data.map((obj: any, rowIdx: number) => (
                        <tr key={rowIdx} style={{ borderBottom: '1px solid #eee' }} >
                            {listKeys.map((key: string) => (
                                <td key={key} style={{ padding: '10px', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(obj[key])}>
                                    {obj[key]}
                                </td>
                            ))}

                            <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Dropdown
                                        trigger={
                                            <div style={{
                                                padding: '8px',
                                                borderRadius: '50%',
                                                transition: 'background 0.2s',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} color="#666" />
                                            </div>
                                        }
                                        items={[
                                            {
                                                label: 'Editar',
                                                icon: <FontAwesomeIcon icon={faPencil} />,
                                                onClick: () => props.onEdit(obj, props.typeData)
                                            },
                                            {
                                                label: 'Excluir',
                                                icon: <FontAwesomeIcon icon={faTrash} />,
                                                onClick: () => props.onDelete(obj, props.typeData),
                                                color: '#d32f2f'
                                            }
                                        ]}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td style={{ padding: '10px 10px 0', textAlign: 'right', fontStyle: 'italic' }} colSpan={listKeys.length + 1}>
                            Total de {data.length} {props.typeData === 'ong' ? 'ONGs' : 'registros'}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
