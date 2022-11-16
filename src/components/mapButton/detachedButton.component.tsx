import { useContext } from "react";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { pathContext } from "../../contexts/path.context";
import { ToggleChart } from "../../contexts/toggleChart.context";

// this button does not interact with the Map
const DetachedButton = () => {
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
      {dashState ? <GoEye /> : <GoEyeClosed />}
    </button>
  );
};

export default DetachedButton;
