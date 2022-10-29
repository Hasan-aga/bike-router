import { createContext, ReactNode, useState } from "react";

interface ChartPoint {
  chartPoint: number | undefined;
  setChartPoint: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const chartPointContext = createContext<ChartPoint>({
  chartPoint: undefined,
  setChartPoint: () => {},
});

export const ChartPointProvider = ({ children }: { children: ReactNode }) => {
  const [chartPoint, setChartPoint] = useState<number | undefined>();
  const value = { chartPoint, setChartPoint };
  return (
    <chartPointContext.Provider value={value}>
      {children}
    </chartPointContext.Provider>
  );
};
