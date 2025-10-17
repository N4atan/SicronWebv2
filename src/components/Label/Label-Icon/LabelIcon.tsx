import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LabelIcon.css'


type LabelIconProps = {
    icon: IconDefinition;
    text?: string;
    subtext?: string;
}


export const LabelIcon = (props: LabelIconProps) => {
    return (
        <div className="label-icon">
            <FontAwesomeIcon icon={props.icon} color="#666" />

            <div className="label-icon-texts">
                <span className="label-icon-subtext"> { props.subtext } </span>
                <span className="label-icon-text"> { props.text || '-' } </span>
            </div>

        </div>
    )
}