import { useContext } from "react";
import { inclinationContext } from "../../contexts/inclination.context";

import Search from "../search/search.component";
import "./sidemenu.style.scss";
const Sidemenu = () => {
  const { inclination } = useContext(inclinationContext);
  const info = inclination ? <p> Average inclination: {inclination}%</p> : "";
  return (
    <div className="sidemenu scroll scroll-5">
      <Search placeholder="Search location" />
      {info}
    </div>
  );
};

export default Sidemenu;
