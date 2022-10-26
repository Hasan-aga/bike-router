import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { Point } from "../../contexts/point.context";
import { Route } from "../../contexts/routeTypes";
import { getRoute } from "../../utils/getRoute";

const Path = ({ points }: { points: Point[] }) => {
  const [routeData, setRouteData] = useState<number[][][]>();

  const getStartAndEnd = (points: Point[]): LatLngLiteral[] | undefined => {
    const startPoint = points.find((p) => p.type === "start");
    const endPoint = points.find((p) => p.type === "end");
    if (!startPoint || !endPoint) return;
    return [startPoint.coords, endPoint.coords];
  };

  useEffect(() => {
    const startAndEndPoints = getStartAndEnd(points);
    const drawRoute = async () => {
      const results = startAndEndPoints && (await getRoute(startAndEndPoints));
      if (!results) return;
      setRouteData(results.features[0].geometry.coordinates);
    };
    drawRoute();
  }, [points]);
  return (
    <>
      {routeData &&
        routeData.map((path) => {
          return (
            <Polyline
              key={path[0][0]}
              pathOptions={{ color: "red" }}
              positions={
                path.map((latLng) => [
                  latLng[1],
                  latLng[0],
                ]) as LatLngExpression[]
              }
            />
          );
        })}
      {/* {routeData && (

        <Polyline
          pathOptions={{ color: "red" }}
          positions={
            routeData.map((latLng) => [
              latLng[1],
              latLng[0],
            ]) as LatLngExpression[]
          }
        />
      )} */}
    </>
  );
};

export default Path;
