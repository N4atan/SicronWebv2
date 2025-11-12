export const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{width: '100%', height: '100%', zIndex: '3000', position: 'fixed', top: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
    >
        {children}
        
    </div>
)