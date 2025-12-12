import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBuilding, faUser, faCalendar, faHashtag } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import "./DonationReceipt.css";

type Item = {
    name: string;
    qtd: number;
    price: number;
};

type Props = {
    id: string;
    date: string;
    ongName: string;
    donorName?: string;
    items: Array<Item>;
    total: number;
    onViewReceipt?: () => void;
    onClose?: () => void;
};

export default function DonationReceipt(props: Props) {
    return (
        <div className="receipt-container">
            <div className="receipt-header">
                <div className="receipt-header-top">
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                    <h2 className="receipt-title">Comprovante de Doação</h2>
                </div>
                <p className="receipt-subtitle">Obrigado por fazer a diferença!</p>
            </div>

            <div className="receipt-body">
                <div className="receipt-info-grid">
                    <div className="info-item">
                        <div className="info-label-row">
                            <FontAwesomeIcon icon={faBuilding} />
                            <span>ONG Beneficiada</span>
                        </div>
                        <div className="info-value">{props.ongName}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label-row">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Doador</span>
                        </div>
                        <div className="info-value">{props.donorName || "Anônimo"}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label-row">
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>Data</span>
                        </div>
                        <div className="info-value">{props.date}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label-row">
                            <FontAwesomeIcon icon={faHashtag} />
                            <span>ID da Transação</span>
                        </div>
                        <div className="info-value">{props.id}</div>
                    </div>
                </div>

                <div className="receipt-items-section">
                    <h3 className="items-section-title">Itens Doados</h3>
                    <div className="items-list">
                        {props.items.map((item, index) => (
                            <div key={index} className="item-row">
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-quantity">Quantidade: {item.qtd}</span>
                                </div>
                                <span className="item-price">R$ {(item.price * item.qtd).toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="total-box">
                    <span className="total-label">Total Doado</span>
                    <span className="total-value">R$ {props.total.toFixed(2).replace('.', ',')}</span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <Button
                        variant="primary"
                        text="Visualizar Comprovante"
                        style={{ width: "100%", fontSize: "0.9rem", padding: "0.6rem" }}
                        onClick={props.onViewReceipt}
                    />
                </div>

                <div className="receipt-footer-text">
                    Este comprovante é válido como recibo de doação
                </div>
            </div>
        </div>
    );
}
