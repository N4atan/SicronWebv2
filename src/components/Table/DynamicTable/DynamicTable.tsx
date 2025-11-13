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


    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
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
        </table>
    )
}
