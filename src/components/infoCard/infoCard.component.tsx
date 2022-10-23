import { LatLngLiteral } from "leaflet";
import "./infoCard.style.scss";

type InfoCardProps = {
  description: LatLngLiteral;
  title?: string;
};

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="infocard">
      {title && <h4 className="title">{title}</h4>}
      <p className="description">
        {description.lat} {description.lng}
      </p>
    </div>
  );
};

export default InfoCard;
