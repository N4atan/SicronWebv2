export const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{width: '100dvw', height: '100dvh', zIndex: '2000', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
    >
        {children}
        
    </div>
)