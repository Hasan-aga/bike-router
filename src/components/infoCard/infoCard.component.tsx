import "./infoCard.style.scss";

type InfoCardProps = {
  description: string;
  title?: string;
};

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="infocard">
      {title && <h4 className="title">{title}</h4>}
      <p className="description">{description}</p>
    </div>
  );
};

export default InfoCard;
