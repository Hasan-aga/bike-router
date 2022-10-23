import { LatLngLiteral } from "leaflet";
import { createContext, ReactNode, useState } from "react";

export type PointType = "start" | "end" | "mid";
export type Point = {
  type: PointType;
  coords: LatLngLiteral;
};

type Points = {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
};
// creating the actual context with default value
export const pointContext = createContext<Points>({
  points: [{ type: "start", coords: { lat: 0, lng: 0 } }],
  setPoints: () => {},
});

type Props = {
  children?: ReactNode;
  // any props that come into the component
};

export const PointProvider = ({ children }: Props) => {
  const [points, setPoints] = useState<Point[]>([
    { type: "end", coords: { lat: 0, lng: 0 } },
  ]);
  const value = { points, setPoints };

  return (
    <pointContext.Provider value={value}>{children}</pointContext.Provider>
  );
};
