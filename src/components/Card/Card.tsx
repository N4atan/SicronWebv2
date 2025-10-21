import './Card.css';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    titleSection?: string;
    subtitleSection?: string;
    children?: React.ReactNode;
}

export default function Card(props: CardProps) {
    return (
      <section className="card-section" {...props}>
          <h1>{ props.titleSection }</h1>
          { props.subtitleSection && <h2>{ props.subtitleSection }</h2> }

          {props.children}
      </section>
    );
}