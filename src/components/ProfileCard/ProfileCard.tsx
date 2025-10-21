import React from 'react';
import Card from '../Card/Card';

import './ProfileCard.css';

type Props = React.HTMLAttributes<HTMLElement> & {
    src: string;
    name: string;
    tags: string[];
}

export default function ProfileCard(props: Props){
    return (
        // card principal
        <Card {...props}>

            {/*  foto */}
            <div className='container-img-profile'>
                <img src={props.src} alt={props.name} />
            </div>

            {/*  informações */}
            <div className='container-info-profile'>

                {/* nome */}
                <h1>
                    { props.name }
                </h1>

                {/* tags */}
                <div>
                    { props.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                    )) }
                </div>

            </div>

        </Card>
    )
}