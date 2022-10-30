import { Route } from "../../utils/routeTypes";
import { calculateElevation } from "../../utils/getElevationData";
import "./elevationChart.style.scss";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { useContext, useState } from "react";
import { chartPointContext } from "../../contexts/chart.context";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevation(pathData);
  const { setChartPoint } = useContext(chartPointContext);
  const [firstPoint, setFirstPoint] = useState<number>();
  const [secondPoint, setSecondPoint] = useState<number>();

  const setHoveredPoint = (chartState: CategoricalChartState) => {
    const hoveredLabel = Number(chartState.activeLabel);
    if (!hoveredLabel) return;

    const elevation_range =
      pathData.features[0].properties.legs[0].elevation_range;
    const hoveredIndex = elevation_range.findIndex(
      (data) => data[0] === hoveredLabel
    );

    const hoveredPoint =
      pathData.features[0].geometry.coordinates[0][hoveredIndex];

    setChartPoint({
      type: "temporary",
      coords: { lat: hoveredPoint[1], lng: hoveredPoint[0] },
    });
  };

  const clearHoverPoint = () => {
    setChartPoint(undefined);
  };

  const calculateSlope = (startPoint: number, endPoint: number) => {
    const startElevation = chartData.find(
      (element) => element.label === startPoint
    )?.data;
    const endElevation = chartData.find(
      (element) => element.label === endPoint
    )?.data;

    if (!startElevation || !endElevation) return;
    const horizontalDelta = Math.abs(endPoint - startPoint);
    const verticalDelta = Math.abs(endElevation - startElevation);

    const slope = (verticalDelta / horizontalDelta) * 100;

    console.log(`slope: ${slope}`);
    return slope;
  };

  return (
    <div className="elevation-chart">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={chartData}
          onMouseMove={(e) => {
            firstPoint && setSecondPoint(Number(e.activeLabel));
            setHoveredPoint(e);
          }}
          onMouseLeave={clearHoverPoint}
          onMouseDown={(e) => setFirstPoint(Number(e.activeLabel))}
          onMouseUp={() => {
            firstPoint &&
              secondPoint &&
              calculateSlope(firstPoint, secondPoint);
          }}
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
