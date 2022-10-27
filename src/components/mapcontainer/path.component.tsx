import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { pathContext } from "../../contexts/path.context";
import { Point } from "../../contexts/point.context";
import { getRoute } from "../../utils/getRoute";

const Path = ({ points }: { points: Point[] }) => {
  // const [routeData, setRouteData] = useState<number[][][]>();
  const { path, setPath } = useContext(pathContext);
  console.log(`path= ${path}`);

  const legs = path && path.features[0].geometry.coordinates;

  const getStartAndEnd = (points: Point[]): LatLngLiteral[] | undefined => {
    const startPoint = points.find((p) => p.type === "start");
    const endPoint = points.find((p) => p.type === "end");
    if (!startPoint || !endPoint) return;
    return [startPoint.coords, endPoint.coords];
  };

  useEffect(() => {
    const startAndEndPoints = getStartAndEnd(points);
    const getPathData = async () => {
      const results = startAndEndPoints && (await getRoute(startAndEndPoints));
      if (!results) setPath(undefined);
      setPath(results);
    };
    getPathData();
  }, [points]);
  return (
    <>
      {legs &&
        legs.map((leg) => {
          return (
            <Polyline
              key={leg[0][0]}
              pathOptions={{ color: "red" }}
              positions={
                leg.map((latLng) => [
                  latLng[1],
                  latLng[0],
                ]) as LatLngExpression[]
              }
            />
          );
        })}
    </>
  );
};

export default Path;
