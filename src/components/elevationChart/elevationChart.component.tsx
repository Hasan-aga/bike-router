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
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevationProfileData(pathData);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Elevation chart",
      },
      legend: {
        display: false,
      },
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
      <Line height={"40%"} options={options} data={chartData} />
    </div>
  );
};

export default ElevationChart;
