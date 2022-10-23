import { useContext } from "react";
import { pointContext } from "../../contexts/point.context";
import InfoCard from "../infoCard/infoCard.component";
import Search from "../search/search.component";
import "./sidemenu.style.scss";
const Sidemenu = () => {
  const { points } = useContext(pointContext);

  return (
    <div className="sidemenu">
      <Search placeholder="Search.." />
      {points.map((point) => (
        <InfoCard description={point.coords} title={point.type} />
      ))}
    </div>
  );
};

export default Sidemenu;
