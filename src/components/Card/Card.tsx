import './Card.css';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  titleSection?: string;
  subtitleSection?: string;
  children?: React.ReactNode;
}

export default function Card({ titleSection, subtitleSection, children, ...props }: CardProps) {
  return (
    <section className="card-section" {...props}>
      {titleSection && (
        <div className='card-header'>
          <h1>{titleSection}</h1>
          <h2>{subtitleSection}</h2>
        </div>
      )}

      {children}
    </section>
  );
}