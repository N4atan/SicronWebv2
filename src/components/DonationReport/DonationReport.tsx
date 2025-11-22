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
        <div className="report-row">
          <FontAwesomeIcon icon={faCalendar} />
          <span>{props.date}</span>
        </div>

        <div className="report-row">
          <FontAwesomeIcon icon={faBuilding} />
          <span>{props.ongName}</span>
        </div>

        <div className="report-status">Concluída</div>
      </div>

      <ul className="report-list">
        {props.items.map((item, index) => (
          <li key={index} className="report-item">
            <div className="report-item-row">
              <span className="item-name">{item.name}</span>
              <span className="item-price">R$ {(item.price * item.qtd).toFixed(2)}</span>
            </div>

            <span className="item-details">
              {item.qtd} unidade(s) × R$ {item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="report-total">
        <span>Total</span>
        <span>R$ {props.total.toFixed(2)}</span>
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
