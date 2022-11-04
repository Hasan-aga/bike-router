import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useContext, useEffect } from "react";
import { Polyline } from "react-leaflet";
import { pathContext } from "../../contexts/path.context";
import { Point } from "../../contexts/point.context";
import { getRoute } from "../../utils/getRoute";

const Path = ({ points }: { points: Point[] }) => {
  // const [routeData, setRouteData] = useState<number[][][]>();
  const { path, setPath } = useContext(pathContext);

  const legs = path && path.features[0].geometry.coordinates;

  const getPathPoints = (points: Point[]): LatLngLiteral[] | undefined => {
    const startPoint = points.find((p) => p.type === "start");
    const endPoint = points.find((p) => p.type === "end");
    const midPoints = points.filter((p) => p.type === "mid");

    if (!startPoint || !endPoint) return;
    const pathCoords = [
      startPoint.coords,
      ...midPoints.map((p) => p.coords),
      endPoint.coords,
    ];
    return pathCoords;
  };

  useEffect(() => {
    const pathPoints = getPathPoints(points);

    const getPathData = async () => {
      const results = pathPoints && (await getRoute(pathPoints));
      if (!results) setPath(undefined);
      setPath(results);
    };
    getPathData();
  }, [points, setPath]);
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
