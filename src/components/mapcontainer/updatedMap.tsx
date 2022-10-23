import { LatLngExpression } from "leaflet";
import { useContext, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { pointContext } from "../../contexts/point.context";
import MarkerWithPop from "./marker";

type Props = {
  coords: number[];
};

const UpdatedMap = ({ coords }: Props) => {
  const { points, setPoints } = useContext(pointContext);

  const map = useMap();
  useEffect(() => {
    // map.setView(coords as LatLngExpression);
    map.flyTo(coords as LatLngExpression);
  }, coords);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      points.push({ type: "start", coords });
      const newPoints = [...points];
      setPoints(newPoints);
    },
  });

  return (
    <MarkerWithPop position={points[points.length - 1].coords} map={map} />
  );
};

export default UpdatedMap;
