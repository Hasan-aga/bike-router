import { useContext, useState } from "react";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import Sidemenu from "../sidemenu/sidemenu.component";
import "./dashboard.style.scss";

const Dashboard = () => {
  const { path } = useContext(pathContext);
  const [transitionEnd, setTransitionEnd] = useState<boolean>(false);
  return (
    <div
      className={`dashboard ${path ? "large" : ""}`}
      onTransitionEnd={() => {
        setTransitionEnd(Boolean(path));
      }}
    >
      <Sidemenu />
      {path && transitionEnd && <ElevationChart pathData={path} />}
    </div>
  );
};

export default Dashboard;
