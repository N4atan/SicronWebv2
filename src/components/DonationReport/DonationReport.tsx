import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBuilding, faBox } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./DonationReport.css";

type Item = {
  name: string;
  qtd: number;
  price: number;
};

type Props = {
  id: string;
  date: string;
  ongName: string;
  items: Array<Item>;
  total: number;
  onViewReceipt: () => void;
};

export default function DonationReport(props: Props) {
  return (
    <Card titleSection={`Doação #${props.id}`}>
      <div className="report-header">
        <div className="report-info">
          <div className="report-row">
            <FontAwesomeIcon icon={faCalendar} className="icon-muted" />
            <span className="report-date">{props.date}</span>
          </div>
          <div className="report-row">
            <FontAwesomeIcon icon={faBuilding} className="icon-muted" />
            <span className="report-ong">{props.ongName}</span>
          </div>
        </div>
        <div className="report-status">Concluída</div>
      </div>

      <ul className="report-list">
        {props.items.map((item, index) => (
          <li key={index} className="report-item">
            <div className="report-item-main">
              <span className="item-name">{item.name}</span>
              <span className="item-total">R$ {(item.price * item.qtd).toFixed(2)}</span>
            </div>
            <div className="report-item-sub">
              <span className="item-quantity">{item.qtd}x</span>
              <span className="item-unit-price">R$ {item.price.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="report-footer">
        <div className="report-total">
          <span className="total-label">Total da Doação</span>
          <span className="total-value">R$ {props.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        text="Visualizar Comprovante"
        style={{ width: "100%" }}
        onClick={props.onViewReceipt}
      />
    </Card>
  );
}
