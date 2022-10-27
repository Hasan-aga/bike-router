import ElevationChart from "../elevationChart/elevationChart.component";
import Mapcontainer from "../mapcontainer/mapcontainer.component";
import Sidemenu from "../sidemenu/sidemenu.component";
import "./dataViz.style.scss";

const DataViz = () => {
  return (
    <div className="data-viz">
      <Mapcontainer />
      <ElevationChart />
    </div>
  );
};

export default DataViz;
