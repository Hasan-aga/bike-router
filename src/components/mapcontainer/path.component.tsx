import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { Route } from "../../contexts/routeTypes";
import { getRoute } from "../../utils/getRoute";

// TODO: REMOVE ANY
const Path = () => {
  // TODO: draw a test line (polyline)

  const [routeData, setRouteData] = useState<number[][][]>();

  useEffect(() => {
    const testPoints: LatLngLiteral[] = [
      { lat: 52.37916210613177, lng: 4.859168033949572 },
      {
        lat: 52.361659073117764,
        lng: 4.880517577487824,
      },
    ];
    const drawRoute = async () => {
      const results = await getRoute(testPoints);
      // console.log(
      //   "results: ",
      //   results.features[0].geometry.coordinates[0].map((latLng) => [
      //     latLng[1],
      //     latLng[0],
      //   ])
      // );

      setRouteData(results.features[0].geometry.coordinates);
    };
    drawRoute();
  }, []);
  return (
    <>
      {routeData &&
        routeData.map((path) => {
          return (
            <Polyline
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
