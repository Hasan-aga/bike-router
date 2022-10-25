import { LatLngLiteral, Map } from "leaflet";
import { Marker } from "react-leaflet";
import Popmenu from "./popup.component";

type Props = {
  position: LatLngLiteral;
  map: Map;
};

const MarkerWithPop = ({ position, map }: Props) => {
  return (
    <>
      <Marker position={position}>
        <Popmenu position={position} map={map} />
      </Marker>
    </>
  );
};

export default MarkerWithPop;
