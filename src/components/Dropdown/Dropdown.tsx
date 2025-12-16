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

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <div className="dropdown-menu">
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
