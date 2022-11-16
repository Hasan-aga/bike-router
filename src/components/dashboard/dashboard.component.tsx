import { useContext, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import "./dashboard.style.scss";
import { ToggleChart } from "../../contexts/toggleChart.context";

const Dashboard = () => {
  const { path } = useContext(pathContext);
  const [transitionEnd, setTransitionEnd] = useState<boolean>(false);
  const chartRef = useRef(null);
  const [dashState] = useContext(ToggleChart);

  return (
    <div
      className={`dashboard ${path ? "large" : "invisible"} ${
        dashState ? "" : "invisible"
      }`}
      onTransitionEnd={() => {
        setTransitionEnd(Boolean(path));
      }}
    >
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
