import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import { Point, pointContext, PointType } from "../../contexts/point.context";
import "./popup.style.scss";

type Props = {
  map: Map;
  point: Point;
};
const Popmenu = ({ map, point }: Props) => {
  const popupRef = useRef<LeafletPopup>(null);
  const { points, setPoints, startPointExists, setStartPointExists } =
    useContext(pointContext);

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
    const newPoints = [...points];
    newPoints.push(newPoint);
    setPoints(newPoints);

    setStartPointExists(true);
  };

  const removePoint = () => {
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
                console.log(e);

                e.stopPropagation();

                removePoint();
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

                removePoint();
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
            {!startPointExists && (
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
      break;
  }
};

export default Popmenu;
