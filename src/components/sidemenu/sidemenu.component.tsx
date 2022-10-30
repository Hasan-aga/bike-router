import { useContext } from "react";
import { pointContext } from "../../contexts/point.context";
import InfoCard from "../infoCard/infoCard.component";
import Search from "../search/search.component";
import "./sidemenu.style.scss";
const Sidemenu = () => {
  const { points } = useContext(pointContext);

  return (
    <div className="sidemenu scroll scroll-5">
      <Search placeholder="Search.." />
      {points.map((point) => (
        <InfoCard
          key={point.coords as any as string}
          description={point.coords}
          title={point.type}
        />
      ))}
    </div>
  );
};

export default Sidemenu;
