import { createContext, ReactNode, useState } from "react";
import { Point } from "./point.context";

interface ChartPoint {
  chartPoint: Point | undefined;
  setChartPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
}

export const chartPointContext = createContext<ChartPoint>({
  chartPoint: undefined,
  setChartPoint: () => {},
});

export const ChartPointProvider = ({ children }: { children: ReactNode }) => {
  const [chartPoint, setChartPoint] = useState<Point | undefined>();
  const value = { chartPoint, setChartPoint };
  return (
    <chartPointContext.Provider value={value}>
      {children}
    </chartPointContext.Provider>
  );
};
