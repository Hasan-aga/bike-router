import { useContext } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { pathContext } from "../../contexts/path.context";
import { ToggleChart } from "../../contexts/toggleChart.context";

// this button does not interact with the Map
const ToggleChartButton = () => {
  const [dashState, toggleDash] = useContext(ToggleChart);
  const { path } = useContext(pathContext);
  if (!path) return <></>;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleDash();
      }}
      className="map-button"
      title={`${dashState ? "Hide chart" : "Show chart"}`}
    >
      {dashState ? <FiEyeOff /> : <FiEye />}
    </button>
  );
};

export default ToggleChartButton;
