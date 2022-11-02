import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
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
      <CSSTransition in={Boolean(path)} timeout={2000} classNames="chart">
        <div className="chart-container">
          {path && transitionEnd && <ElevationChart pathData={path} />}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dashboard;
