import { LatLngLiteral, Map } from "leaflet";
import { Marker } from "react-leaflet";
import { Point } from "../../contexts/point.context";
import Popmenu from "./popup.component";

type Props = {
  point: Point;
  map: Map;
};

const MarkerWithPop = ({ point, map }: Props) => {
  return (
    <>
      <Marker position={point.coords}>
        <Popmenu point={point} map={map} />
      </Marker>
    </>
  );
};

export default MarkerWithPop;
