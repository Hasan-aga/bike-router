import { useContext } from "react";
import { inclinationContext } from "../../contexts/inclination.context";
import { pointContext } from "../../contexts/point.context";
import InfoCard from "../infoCard/infoCard.component";
import Search from "../search/search.component";
import "./sidemenu.style.scss";
const Sidemenu = () => {
  const { inclination } = useContext(inclinationContext);
  console.log("inclination:", inclination);

  return (
    <div className="sidemenu scroll scroll-5">
      <Search placeholder="Search location" />
      {inclination && <p> Average inclination: {inclination}%</p>}
    </div>
  );
};

export default Sidemenu;
