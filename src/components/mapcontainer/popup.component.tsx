import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { Point, pointContext, PointType } from "../../contexts/point.context";
import PopupButton from "../popupButton/popupButton.component";
import "./popup.style.scss";

interface Props {
  map: Map;
  point: Point;
  setTemporaryPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
}

const Popmenu = ({ map, point, setTemporaryPoint }: Props) => {
  const popupRef = useRef<LeafletPopup>(null);
  const { points } = useContext(pointContext);

  const displayPopup = useCallback(
    (position: LatLngLiteral) => {
      if (popupRef.current) {
        popupRef.current.setLatLng(position);
        map.openPopup(popupRef.current);
      }
    },
    [map]
  );

  type ExistingPoints =
    | "startExists"
    | "endExists"
    | "startAndEndExist"
    | "noneExists";

  const menuSelector: Record<ExistingPoints, JSX.Element> = {
    noneExists: (
      <div className="popup">
        <PopupButton
          point={point}
          type="start"
          setTemporaryPoint={setTemporaryPoint}
        />
        <PopupButton
          point={point}
          type="end"
          setTemporaryPoint={setTemporaryPoint}
        />
      </div>
    ),
    startExists: (
      <div className="popup">
        <PopupButton
          point={point}
          type="end"
          setTemporaryPoint={setTemporaryPoint}
        />
      </div>
    ),
    endExists: (
      <div className="popup">
        <PopupButton
          point={point}
          type="start"
          setTemporaryPoint={setTemporaryPoint}
        />
      </div>
    ),
    startAndEndExist: (
      <div className="popup">
        <PopupButton
          point={point}
          type="mid"
          setTemporaryPoint={setTemporaryPoint}
        />
      </div>
    ),
  };

  useEffect(() => {
    displayPopup(point.coords);
  }, [point, displayPopup]);

  const getExistingPoints = (points: Point[]): ExistingPoints => {
    const pointTypeSet = new Set<PointType>();
    points.forEach((p) => pointTypeSet.add(p.type));
    if (pointTypeSet.has("start") && pointTypeSet.has("end"))
      return "startAndEndExist";
    if (pointTypeSet.has("start")) return "startExists";
    if (pointTypeSet.has("end")) return "endExists";
    return "noneExists";
  };

  return (
    <Popup ref={popupRef}>
      {point.type === "temporary" ? (
        menuSelector[getExistingPoints(points)]
      ) : (
        <div className="popup">
          <PopupButton
            point={point}
            type="remove"
            setTemporaryPoint={setTemporaryPoint}
          />
        </div>
      )}
    </Popup>
  );
};

export default Popmenu;
