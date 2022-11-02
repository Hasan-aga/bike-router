import { LatLngLiteral } from "leaflet";
import { createContext, ReactNode, useState } from "react";

export type PointType = "start" | "end" | "mid" | "temporary";
export type Point = {
  type: PointType;
  coords: LatLngLiteral;
};

type PointsStore = {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  route?: number[];
};
// creating the actual context with default value
export const pointContext = createContext<PointsStore>({
  points: [{ type: "temporary", coords: { lat: 0, lng: 0 } }],
  setPoints: () => {},
});

type Props = {
  children?: ReactNode;
  // any props that come into the component
};

export const PointProvider = ({ children }: Props) => {
  const [points, setPoints] = useState<Point[]>([
    { type: "temporary", coords: { lat: 0, lng: 0 } },
  ]);

  const value = {
    points,
    setPoints,
  };

  return (
    <pointContext.Provider value={value}>{children}</pointContext.Provider>
  );
};
