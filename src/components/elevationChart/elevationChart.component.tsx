import { Route } from "../../utils/routeTypes";
import { calculateElevationProfileData } from "../../utils/getElevationData";
import "./elevationChart.style.scss";
import { ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from "recharts";
import { Tooltip } from "react-leaflet";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevationProfileData(pathData);

  return (
    <div className="elevation-chart">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={chartData}
          onMouseMove={(e) => console.log(e?.activeLabel)}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" />
          <YAxis dataKey="data" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="data"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElevationChart;
