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

  const { setChartPoint } = useContext(chartPointContext);
  const [firstPoint, setFirstPoint] = useState<number>();
  const [secondPoint, setSecondPoint] = useState<number>();
  const [startHighlight, setStartHighlight] = useState<boolean>(false);
  const [calculateInclination, setCalculateInclination] =
    useState<boolean>(false);

  console.log("1st and 2nd points", firstPoint, secondPoint);

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
            startHighlight && setSecondPoint(Number(e.activeLabel));
            startHighlight && setCalculateInclination(true);
          }}
          onMouseLeave={clearHoverPoint}
          onMouseDown={(e) => {
            setStartHighlight(true);
            setFirstPoint(Number(e.activeLabel));
            setCalculateInclination(false);
          }}
          onMouseUp={(e) => {
            calculateInclination && setSecondPoint(Number(e.activeLabel));
            setStartHighlight(false);
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* TODO: use x2 x2 to draw a partial graph as highlight */}
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
              style={{
                textAnchor: "middle",
                fontSize: "80%",
                fill: "#8884d8",
              }}
            />
          </XAxis>
          <YAxis dataKey="elevation">
            <Label
              value="Elevation in meters"
              angle={-90}
              style={{
                textAnchor: "middle",
                fontSize: "80%",
                fill: "#8884d8",
              }}
            />
          </YAxis>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          {firstPoint && secondPoint && calculateInclination && (
            <ReferenceArea
              x1={firstPoint}
              x2={secondPoint}
              label=<Label
              value={`${calculateSlope(firstPoint, secondPoint)}% inclination`}
              style={{
                textAnchor: "middle",
                fontSize: "90%",
                fill: "#c3c2d8",
              }}
            />
              style={{
                textAnchor: "middle",
                fontSize: "80%",
                fill: "#8884d8",
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElevationChart;
