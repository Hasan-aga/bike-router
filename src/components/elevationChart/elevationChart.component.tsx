import { Route } from "../../utils/routeTypes";
import { calculateElevationProfileData } from "../../utils/getElevationData";
import "./elevationChart.style.scss";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "react-leaflet";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevationProfileData(pathData);

  return (
    <div className="elevation-chart">
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={chartData}>
          <Tooltip />
          <Line type="monotone" dataKey="data" stroke="#8884d8" />
          <XAxis dataKey="label" />
          <YAxis dataKey="data" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElevationChart;
