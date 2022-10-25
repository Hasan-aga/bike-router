import { LatLngLiteral } from "leaflet";
import { createContext, ReactNode, useState } from "react";
import { getRoute } from "../utils/getRoute";

export type PointType = "start" | "end" | "mid" | "temporary";
export type Point = {
  type: PointType;
  coords: LatLngLiteral;
};

type PointsStore = {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  startPointExists: boolean;
  setStartPointExists: React.Dispatch<React.SetStateAction<boolean>>;
  route?: number[];
};
// creating the actual context with default value
export const pointContext = createContext<PointsStore>({
  points: [{ type: "temporary", coords: { lat: 0, lng: 0 } }],
  setPoints: () => {},
  startPointExists: false,
  setStartPointExists: () => {},
});

type Props = {
  children?: ReactNode;
  // any props that come into the component
};

export const PointProvider = ({ children }: Props) => {
  const [points, setPoints] = useState<Point[]>([
    { type: "temporary", coords: { lat: 0, lng: 0 } },
  ]);

  const [startPointExists, setStartPointExists] = useState(false);
  const value = {
    points,
    setPoints,
    startPointExists,
    setStartPointExists,
  };

  return (
    <pointContext.Provider value={value}>{children}</pointContext.Provider>
  );
};

const testPoints: LatLngLiteral[] = [
  { lat: 47.569664, lng: 10.7021002 },
  { lat: 47.575734, lng: 10.720492 },
];
getRoute(testPoints);
