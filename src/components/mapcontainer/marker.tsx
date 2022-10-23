import { LatLngExpression, LatLngLiteral, Map } from "leaflet";
import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import Popmenu from "./popup.component";

type Props = {
  position: LatLngLiteral;
  map: Map;
};

const MarkerWithPop = ({ position, map }: Props) => {
  return (
    <>
      <Marker position={position}>
        <Popmenu map={map} />
      </Marker>
    </>
  );
};

export default MarkerWithPop;
