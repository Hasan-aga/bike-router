import { Route } from "../../utils/routeTypes";
import { calculateElevationProfileData } from "../../utils/getElevationData";
import "./elevationChart.style.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
  Line,
} from "react-chartjs-2";
import { useRef } from "react";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevationProfileData(pathData);

  const chartRef = useRef<ChartJSOrUndefined<"line", number[], number>>();

  const options = {
    responsive: true,
    elements: {
      point: { pointBorderColor: "#aa767c", pointStyle: "cross", rotation: 45 },
      line: { borderWidth: 3 },
    },
    plugins: {
      title: {
        display: true,
        text: "Elevation chart",
      },
      legend: {
        display: false,
      },
    },
    tooltips: {
      intersect: false,
      mode: "nearest",
    },
    scales: {
      y: {
        display: true,
      },
      x: {
        display: false, // Hide X axis labels
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );
  return (
    <div className="elevation-chart">
      <Line
        ref={chartRef}
        height={"40%"}
        options={options}
        data={chartData}
        onClick={(e) => {
          //TODO: GET DATA FROM NEAREST POINT
          chartRef.current &&
            console.log(getElementAtEvent(chartRef.current, e));
        }}
      />
    </div>
  );
};

export default ElevationChart;
