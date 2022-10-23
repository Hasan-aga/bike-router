import { LatLngLiteral } from "leaflet";
import { type } from "os";
import { createContext, ReactNode, useState } from "react";

type Point = {
  type: "start" | "end" | "mid";
  coords: LatLngLiteral;
};

type PointContext = {
  point: Point;
  setPoint: React.Dispatch<React.SetStateAction<Point>>;
};
// creating the actual context with default value
export const pointContext = createContext<PointContext>({
  point: { type: "start", coords: { lat: 0, lng: 0 } },
  setPoint: () => {},
});

type Props = {
  children?: ReactNode;
  // any props that come into the component
};

export const PointProvider = ({ children }: Props) => {
  const [point, setPoint] = useState<Point>({
    type: "start",
    coords: { lat: 0, lng: 0 },
  });
  const value = { point, setPoint };

  return (
    <pointContext.Provider value={value}>{children}</pointContext.Provider>
  );
};
