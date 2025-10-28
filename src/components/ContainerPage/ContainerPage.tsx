


import './ContainerPage.css'

type Props = {
    variant: string; //'a-left' | 'a-right' | 'a-no';
    children?: React.ReactNode
}

export default function ContainerPage(props: Props){

    const configStyle = props.variant == 'a-no' ? 'a-no'
    : props.variant == 'a-left' ? 'a-left' : 'a-right'

    return (
        <div className={`container-page ${configStyle}`}>
            {props.children}
        </div>
    )
}