import Card from "../Card/Card";
import { LabelIcon } from './../Label/Label-Icon/LabelIcon';

import './HistoryCard.css'

type Props = {
    historyActivities?: Array<{
        text: string;
        subtext: string;
    }>;
}


export default function HistoryCard(props: Props){
    return (
        <Card
            titleSection="Atividade Recente"
            style={{width: '100%'}}
        >
            { props.historyActivities?.length ? (
                <ul className="list-history-activities">
                    { props.historyActivities.map((activity, index) => (
                        <li key={index} >
                            <LabelIcon
                                variant="div-downsubtext"
                                icon={undefined}
                                text={activity.text}
                                subtext={activity.subtext}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma atividade recente</p>
            )}

        </Card>
    )
}