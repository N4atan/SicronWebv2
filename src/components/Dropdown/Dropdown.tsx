import { useRef, useState, useEffect } from 'react';
import './Dropdown.css';

interface DropdownItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    color?: string; // Para itens de perigo (ex: excluir)
}

interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
}

export default function Dropdown({ trigger, items }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fecha ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const handleOpen = (e: React.MouseEvent) => {
        if (isOpen) return setIsOpen(false);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            top: rect.bottom + 5,
            left: rect.left - 100 // Adjust as needed to align right/left
        });
        setIsOpen(true);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={handleOpen}>
                {trigger}
            </div>

            {isOpen && (
                <div
                    className="dropdown-menu"
                    style={{
                        position: 'fixed',
                        top: coords.top,
                        left: coords.left,
                        zIndex: 9999,
                        width: 'max-content'
                    }}
                >
                    <ul className="dropdown-list">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="dropdown-item"
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                                style={{ color: item.color || 'inherit' }}
                            >
                                {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
