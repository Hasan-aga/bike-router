import { Map, Popup as LeafletPopup } from "leaflet";
import { useRef } from "react";
import { Popup } from "react-leaflet";
import "./popup.style.scss";

type Props = {
  map: Map;
};
const Popmenu = ({ map }: Props) => {
  const popupRef = useRef<LeafletPopup>(null);

  popupRef.current && map.openPopup(popupRef.current);

  return (
    <Popup ref={popupRef.current}>
      <div className="popup">
        <button> Set as start</button>
        <button> Set as destination</button>
      </div>
    </Popup>
  );
};

export default Popmenu;
