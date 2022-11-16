import { createContext, ReactNode } from "react";
import useToggle from "../hooks/useToggle.hook";

export const ToggleChart = createContext<[boolean, () => void]>([
  false,
  () => {},
]);

export const ToggleChartProvider = ({ children }: { children: ReactNode }) => {
  const value = useToggle(true);
  return <ToggleChart.Provider value={value}>{children}</ToggleChart.Provider>;
};
