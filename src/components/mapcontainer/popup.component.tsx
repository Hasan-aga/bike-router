import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { Point, pointContext } from "../../contexts/point.context";
import PopupButton from "../popupButton/popupButton.component";
import "./popup.style.scss";

type Props = {
  map: Map;
  point: Point;
  setTemporaryPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
};

const startPointExists = (points: Point[]): boolean =>
  points.find((p) => p.type === "start") !== undefined;

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

  useEffect(() => {
    displayPopup(point.coords);
  }, [point, displayPopup]);

  switch (point.type) {
    case "temporary":
      return (
        <Popup ref={popupRef}>
          <div className="popup">
            {!startPointExists(points) && (
              <PopupButton
                point={point}
                type="start"
                setTemporaryPoint={setTemporaryPoint}
              />
            )}

            <PopupButton
              point={point}
              type="end"
              setTemporaryPoint={setTemporaryPoint}
            />
          </div>
        </Popup>
      );

    default:
      return (
        <Popup ref={popupRef}>
          <div className="popup">
            <PopupButton
              point={point}
              type="remove"
              setTemporaryPoint={setTemporaryPoint}
            />
          </div>
        </Popup>
      );
  }
};

export default Popmenu;
