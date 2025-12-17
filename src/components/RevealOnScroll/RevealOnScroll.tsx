import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealOnScrollProps {
    children: ReactNode;
    threshold?: number; // How much of the element must be visible (0 to 1)
    delay?: number;     // Delay in seconds
}

export default function RevealOnScroll({ children, threshold = 0.1, delay = 0 }: RevealOnScrollProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            {
                threshold: threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const style = {
        transitionDelay: `${delay}s`
    };

    return (
        <div
            ref={ref}
            className={`reveal-transition ${isVisible ? 'animate-fade-up' : ''}`}
            style={style}
        >
            {children}
        </div>
    );
}
