import './VideoPlayer.css'

type VideoPlayerProps = React.HTMLAttributes<HTMLElement> & {
    src: string;
    title: string;
    subtitle: string;
    text: string;
}

export default function VideoPlayer({
    src,
    title,
    subtitle,
    text,
    ...rest
}: VideoPlayerProps) {
    return (
        <section className="video-player" {...rest}>
            <h1 className="video-title">{title}</h1>
            <h2 className="video-subtitle">{subtitle}</h2>

            <video
                className="video-element"
                src={src}
                controls
                preload="metadata"
                playsInline
            />

            <p className="video-description">{text}</p>
        </section>
    )
}