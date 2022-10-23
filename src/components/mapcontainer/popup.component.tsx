import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { Point, pointContext, PointType } from "../../contexts/point.context";
import "./popup.style.scss";

type Props = {
  map: Map;
  position: LatLngLiteral;
};
const Popmenu = ({ map, position }: Props) => {
  const popupRef = useRef<LeafletPopup>(null);
  const { points, setPoints } = useContext(pointContext);

  const displayPopup = useCallback(
    (position: LatLngLiteral) => {
      if (popupRef.current) {
        popupRef.current.setLatLng(position);
        map.openPopup(popupRef.current);
      }
    },
    [map]
  );

  useEffect(() => {
    displayPopup(position);
  }, [position, displayPopup]);

  const createPoint = (type: PointType) => {
    const last = points.at(-1);
    points.pop();
    if (!last) return;

    last.type = type;

    const newPoints = [...points];
    newPoints.push(last);
    setPoints(newPoints);
  };

  return (
    <Popup ref={popupRef}>
      <div className="popup">
        <button
          onClick={() => {
            createPoint("start");
          }}
        >
          {" "}
          Set as start
        </button>
        <button
          onClick={() => {
            createPoint("end");
          }}
        >
          {" "}
          Set as destination
        </button>
      </div>
    </Popup>
  );
};

export default Popmenu;
