import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { Point, pointContext, PointType } from "../../contexts/point.context";
import "./popup.style.scss";

const startPointExists = (points: Point[]): boolean =>
  points.find((p) => p.type === "start") !== undefined;

type Props = {
  map: Map;
  point: Point;
  setTemporaryPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
};
const Popmenu = ({ map, point, setTemporaryPoint }: Props) => {
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
    displayPopup(point.coords);
  }, [point, displayPopup]);

  const createPoint = (type: PointType) => {
    const newPoint: Point = { type, coords: point.coords };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    setTemporaryPoint(undefined);
    if (type === "start") startPointExists(points);
  };

  const removePoint = (type: PointType) => {
    const newPoints = points.filter((p) => p !== point);
    setPoints(newPoints);
  };

  switch (point.type) {
    case "start":
      return (
        <Popup ref={popupRef}>
          <div className="popup">
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePoint("start");
              }}
            >
              Remove point
            </button>
          </div>
        </Popup>
      );

    case "end":
      return (
        <Popup ref={popupRef}>
          <div className="popup">
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePoint("end");
              }}
            >
              {" "}
              Remove point
            </button>
          </div>
        </Popup>
      );

    default:
      return (
        <Popup ref={popupRef}>
          <div className="popup">
            {!startPointExists(points) && (
              <button
                onClick={(e) => {
                  console.log(e);

                  e.stopPropagation();

                  createPoint("start");
                }}
              >
                {" "}
                Set as start
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();

                createPoint("end");
              }}
            >
              {" "}
              Set as destination
            </button>
          </div>
        </Popup>
      );
  }
};

export default Popmenu;
