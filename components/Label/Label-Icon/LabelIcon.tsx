import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LabelIcon.css'


type LabelIconProps = {
    variant: 'icon-upsubtext' | 'div-downsubtext'
    icon: IconDefinition | undefined;
    text?: string;
    subtext?: string;
}

const IconUpSubtext = ({ icon, text, subtext }: LabelIconProps) => (
    <div className="label-container">
        { icon && <FontAwesomeIcon icon={icon} color="#666"  style={{alignSelf: 'center'}}/>}

        <div className="label-texts-container">
            <span className="label-subtext"> {subtext} </span>
            <span className="label-text"> {text || '-'} </span>
        </div>

    </div>
)


const IconDivDownSubtext = ({ text, subtext }: LabelIconProps) => (
    <div className="label-container">
        <div className="label-div"></div>

        <div className="label-texts-container">
            <span className="label-text"> {text} </span>
            <span className="label-subtext"> {subtext} </span>
        </div>

    </div>
)

export const LabelIcon = (props: LabelIconProps) => {
    switch(props.variant){
        case 'icon-upsubtext':
            return <IconUpSubtext {...props} />

        case 'div-downsubtext':
            return <IconDivDownSubtext {...props} />
    }
}