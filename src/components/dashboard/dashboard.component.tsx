import { useContext, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import "./dashboard.style.scss";
import { FiEyeOff, FiEye } from "react-icons/fi";

const Dashboard = () => {
  const { path } = useContext(pathContext);
  const [transitionEnd, setTransitionEnd] = useState<boolean>(false);
  const [dashboardIsVisible, setDashboardIsVisible] = useState<boolean>(true);
  const chartRef = useRef(null);
  return (
    <div
      className={`dashboard ${path ? "large" : ""} ${
        dashboardIsVisible ? "" : "invisible"
      }`}
      onTransitionEnd={() => {
        setTransitionEnd(Boolean(path));
      }}
    >
      {path && (
        <button
          title={`${
            dashboardIsVisible ? "Hide the dashboard" : "Show the dashboard"
          }`}
          className="toggle"
          onClick={() => {
            setDashboardIsVisible(!dashboardIsVisible);
          }}
        >
          {path && (dashboardIsVisible ? <FiEyeOff /> : <FiEye />)}
        </button>
      )}
      <CSSTransition
        in={Boolean(path)}
        timeout={2000}
        classNames="chart"
        nodeRef={chartRef}
      >
        <div className={`chart-container `} ref={chartRef}>
          {/* TODO: to create exit transition we can create empty chart */}
          {path && transitionEnd && <ElevationChart pathData={path} />}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dashboard;
