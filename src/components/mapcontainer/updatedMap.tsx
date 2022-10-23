import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  coords: number[];
};
const UpdatedMap = ({ coords }: Props) => {
  const map = useMap();
  useEffect(() => {
    // map.setView(coords as LatLngExpression);
    map.flyTo(coords as LatLngExpression);
  }, coords);
  return <div></div>;
};

export default UpdatedMap;
