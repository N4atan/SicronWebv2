import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";




type Props = {
    typeData: string;
    listData: Array<any>,
    onEdit: (obj: any, type: string) => void,
    onDelete: (obj: any, type: string) => void
}


export default function DynamicTable(props: Props)  {
    const data = props.listData || [];

    const listKeys = data.length > 0 ? Object.keys(data[0]) : [];

    listKeys.splice(listKeys.indexOf('id'), 1);

    if (props.typeData === 'ong') {
        listKeys.splice(listKeys.indexOf('objetivo'), 1);
    }


    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', overflowX: 'auto' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                    {listKeys.map((key) => (
                        <th key={key} style={{ padding: '10px' }}>{key}</th>
                    ))}
                    
                    <th style={{textAlign: 'center'}}>
                        ações
                    </th>
                </tr>
            </thead>

            <tbody>
                {data.map((obj: any, rowIdx: number) => (
                    <tr key={rowIdx} style={{ borderBottom: '1px solid #eee' }} >
                        {listKeys.map((key: string) => (
                            <td key={key} style={{ padding: '10px' }}>{obj[key]}</td>
                        ))}

                        <td style={{textAlign: 'center'}}>
                            <FontAwesomeIcon icon={faPencil} 
                                style={{marginRight: '10px'}} 
                                cursor={'pointer'} 
                                onClick={() => props.onEdit(obj, props.typeData)} 
                            />
                            
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                cursor={'pointer'} 
                                onClick={() => props.onDelete(obj, props.typeData)}
                            />
                        </td> 
                    </tr>
                ))}
            </tbody>

            <tfoot>
                <tr>
                    <td style={{padding: '10px 10px 0', textAlign: 'right', fontStyle: 'italic'}} colSpan={listKeys.length+1}>
                        Total de {data.length} {props.typeData}
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
