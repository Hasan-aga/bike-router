import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import Sidemenu from "../sidemenu/sidemenu.component";
import "./dashboard.style.scss";
import { FiEyeOff, FiEye } from "react-icons/fi";

const Dashboard = () => {
  const { path } = useContext(pathContext);
  const [transitionEnd, setTransitionEnd] = useState<boolean>(false);
  const [dashboardIsVisible, setDashboardIsVisible] = useState<boolean>(true);
  return (
    <div
      className={`dashboard ${path ? "large" : ""} ${
        dashboardIsVisible ? "" : "invisible"
      }`}
      onTransitionEnd={() => {
        setTransitionEnd(Boolean(path));
      }}
    >
      <Sidemenu />
      <button
        title={`${
          dashboardIsVisible ? "Hide the dashboard" : "Unhide the dashboard"
        }`}
        className="toggle"
        onClick={() => {
          setDashboardIsVisible(!dashboardIsVisible);
        }}
      >
        {path && (dashboardIsVisible ? <FiEyeOff /> : <FiEye />)}
      </button>
      <CSSTransition in={Boolean(path)} timeout={2000} classNames="chart">
        <div className={`chart-container `}>
          {path && transitionEnd && <ElevationChart pathData={path} />}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dashboard;
