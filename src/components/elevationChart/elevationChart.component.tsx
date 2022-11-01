import { Route } from "../../utils/routeTypes";
import {
  calculateElevation,
  getPointFromDistance,
} from "../../utils/getElevationData";
import "./elevationChart.style.scss";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  ReferenceArea,
  Label,
} from "recharts";
import { useContext, useState } from "react";
import { chartPointContext } from "../../contexts/chart.context";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

const ElevationChart = ({ pathData }: { pathData: Route }) => {
  const chartData = calculateElevation(pathData);
  console.log(chartData[0].elevation);

  const { setChartPoint } = useContext(chartPointContext);
  const [firstPoint, setFirstPoint] = useState<number>();
  const [secondPoint, setSecondPoint] = useState<number>();

  const setHoveredPoint = (chartState: CategoricalChartState) => {
    const hoveredLabel = Number(chartState.activeLabel);
    if (!hoveredLabel) return;

    setChartPoint(getPointFromDistance(hoveredLabel, pathData));
  };

  const clearHoverPoint = () => {
    setChartPoint(undefined);
  };

  const calculateSlope = (startPoint: number, endPoint: number) => {
    const startElevation = chartData.find(
      (element) => element.distance === startPoint
    )?.elevation;
    const endElevation = chartData.find(
      (element) => element.distance === endPoint
    )?.elevation;

    if (!startElevation || !endElevation) return;
    const horizontalDelta = Math.abs(endPoint - startPoint);
    const verticalDelta = Math.abs(endElevation - startElevation);

    const slope = (verticalDelta / horizontalDelta) * 100;

    console.log(`slope: ${slope}`);
    return slope.toFixed(2);
  };

  return (
    <div className="elevation-chart">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={chartData}
          margin={{ top: 1, right: 1, left: 1, bottom: 30 }}
          onMouseMove={(e) => {
            setHoveredPoint(e);
          }}
          onMouseLeave={clearHoverPoint}
          onMouseDown={(e) => setFirstPoint(Number(e.activeLabel))}
          onMouseUp={(e) => {
            firstPoint && setSecondPoint(Number(e.activeLabel));
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="distance">
            <Label
              value="Distance in meters"
              offset={-15}
              position="insideBottom"
            />
          </XAxis>
          <YAxis dataKey="elevation">
            <Label value="Elevation in meters" angle={-90} />
          </YAxis>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          {secondPoint && (
            <ReferenceArea
              x1={firstPoint}
              x2={secondPoint}
              label={`${
                firstPoint &&
                secondPoint &&
                calculateSlope(firstPoint, secondPoint)
              }% inclination`}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElevationChart;
