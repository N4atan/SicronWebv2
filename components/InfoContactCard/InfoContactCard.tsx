import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Card from "../Card/Card";
import { LabelIcon } from "../Label/Label-Icon/LabelIcon";

import './InfoContactCard.css';

type Props = {
    listContact?: Array<{
        icon: IconDefinition;
        text: string;
        subtext: string;
    }>;
}

export default function InfoContactCard(props: Props) {
    return (
        <Card
            titleSection="Informações"
        >

            <ul className="list-contact-info">
                { props.listContact?.map((contact, index) => (
                    <li key={index}>
                        <LabelIcon
                            variant="icon-upsubtext"
                            icon={contact.icon}
                            text={contact.text}
                            subtext={contact.subtext}
                        />
                    </li>
                ))}
            </ul>
        </Card>
    )
}