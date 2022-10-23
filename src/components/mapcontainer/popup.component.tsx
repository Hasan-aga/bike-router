import { LatLngLiteral, Map, Popup as LeafletPopup } from "leaflet";
import { useCallback, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";
import "./popup.style.scss";

type Props = {
  map: Map;
  position: LatLngLiteral;
};
const Popmenu = ({ map, position }: Props) => {
  const popupRef = useRef<LeafletPopup>(null);

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

  return (
    <Popup ref={popupRef}>
      <div className="popup">
        <button> Set as start</button>
        <button> Set as destination</button>
      </div>
    </Popup>
  );
};

export default Popmenu;
