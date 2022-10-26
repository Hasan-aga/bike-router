import { LatLngLiteral, Map } from "leaflet";
import { Marker } from "react-leaflet";
import { Point } from "../../contexts/point.context";
import Popmenu from "./popup.component";

type Props = {
  point: Point;
  map: Map;
  setTemporaryPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
};

const MarkerWithPop = ({ point, map, setTemporaryPoint }: Props) => {
  return (
    <>
      <Marker position={point.coords}>
        <Popmenu
          point={point}
          map={map}
          setTemporaryPoint={setTemporaryPoint}
        />
      </Marker>
    </>
  );
};

export default MarkerWithPop;
