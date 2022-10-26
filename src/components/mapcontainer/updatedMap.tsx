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
  const { points } = useContext(pointContext);
  const [temporaryPoint, setTemporaryPoint] = useState<Point>();
  console.table(temporaryPoint);

  const map = useMap();
  useEffect(() => {
    map.setView(coords as LatLngExpression);
    // map.flyTo(coords as LatLngExpression); //animate the movement of the map
  }, [map, coords]);

  useMapEvents({
    click(e) {
      // BUG: when we click popup, this works again
      console.log("pop");

      const coords = e.latlng;
      setTemporaryPoint({ type: "temporary", coords });
    },
  });

  return (
    <>
      {temporaryPoint && (
        <MarkerWithPop
          key={temporaryPoint.coords as any as string}
          point={temporaryPoint}
          map={map}
          setTemporaryPoint={setTemporaryPoint}
        />
      )}
      {points.map((p) => {
        return (
          <MarkerWithPop
            key={p.coords as any as string}
            point={p}
            map={map}
            setTemporaryPoint={setTemporaryPoint}
          />
        );
      })}
      <Path points={points} />
    </>
  );
};

export default UpdatedMap;
