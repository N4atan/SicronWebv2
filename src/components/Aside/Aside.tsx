import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Aside.css';

export interface AsideOption {
    label: string;
    icon: any;
    value: string;
    onClick?: () => void;
}

interface AsideProps {
    options: AsideOption[];
    activeTab: string;
    setActiveTab: (value: string) => void;
}

export default function Aside({ options, activeTab, setActiveTab }: AsideProps) {
    return (
        <aside className="custom-aside">
            <ul className="ul-tabs">
                {options.map((op) => (
                    <li key={op.value} onClick={op.onClick ? op.onClick : () => setActiveTab(op.value)}>
                        <input
                            type="radio"
                            name="tab"
                            id={`tab-${op.value}`}
                            checked={activeTab === op.value}
                            readOnly
                        />
                        <label htmlFor={`tab-${op.value}`}>
                            <FontAwesomeIcon icon={op.icon} />
                            {op.label}
                        </label>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
