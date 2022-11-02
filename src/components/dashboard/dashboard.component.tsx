import { useContext } from "react";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import Sidemenu from "../sidemenu/sidemenu.component";
import "./dashboard.style.scss";

const Dashboard = () => {
  const { path } = useContext(pathContext);
  return (
    <div className={`dashboard ${path ? "large" : ""}`}>
      <Sidemenu />
      {path && <ElevationChart pathData={path} />}
    </div>
  );
};

export default Dashboard;
