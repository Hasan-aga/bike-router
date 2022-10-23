import { LatLngExpression } from "leaflet";
import { useContext, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { pointContext } from "../../contexts/point.context";
import MarkerWithPop from "./marker";

type Props = {
  coords: number[];
};

const UpdatedMap = ({ coords }: Props) => {
  const { point, setPoint } = useContext(pointContext);

  const map = useMap();
  useEffect(() => {
    // map.setView(coords as LatLngExpression);
    map.flyTo(coords as LatLngExpression);
  }, coords);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPoint({ type: "start", coords });
      console.log(coords);
    },
  });

  return <MarkerWithPop position={point.coords} map={map} />;
};

export default UpdatedMap;
