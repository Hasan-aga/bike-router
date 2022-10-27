import { useContext } from "react";
import { pathContext } from "../../contexts/path.context";
import ElevationChart from "../elevationChart/elevationChart.component";
import Mapcontainer from "../mapcontainer/mapcontainer.component";
import "./dataViz.style.scss";

const DataViz = () => {
  const { path } = useContext(pathContext);

  return (
    <div className="data-viz">
      <Mapcontainer />
      {path && <ElevationChart pathData={path} />}
    </div>
  );
};

export default DataViz;
