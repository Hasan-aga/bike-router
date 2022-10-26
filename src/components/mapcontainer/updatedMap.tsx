import { LatLngExpression } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { Point, pointContext } from "../../contexts/point.context";
import MarkerWithPop from "./marker";
import Path from "./path.component";

type Props = {
  coords: number[];
};

const UpdatedMap = ({ coords }: Props) => {
  const { points, setPoints } = useContext(pointContext);
  const [temporaryPoint, setTemporaryPoint] = useState<Point>();

  const map = useMap();
  useEffect(() => {
    map.setView(coords as LatLngExpression);
    // map.flyTo(coords as LatLngExpression); //animate the movement of the map
  }, [map, coords]);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setTemporaryPoint({ type: "temporary", coords });
    },
  });

  return (
    <>
      {temporaryPoint && (
        <MarkerWithPop
          key={temporaryPoint.coords as any as string}
          position={temporaryPoint.coords}
          map={map}
        />
      )}
      {points.map((p) => {
        return (
          <MarkerWithPop
            key={p.coords as any as string}
            position={p.coords}
            map={map}
          />
        );
      })}
      <Path />
    </>
  );
  // <MarkerWithPop position={points[points.length - 1].coords} map={map} />
};

export default UpdatedMap;
