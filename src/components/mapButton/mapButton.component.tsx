import { Map } from "leaflet";
import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useMap } from "react-leaflet";
import "./mapButton.style.scss";

interface Props {
  title: string;
  onClickCallback: (mapRef: Map) => void;
  children: ReactNode;
}

const MapButton: FC<Props> = ({ title, children, onClickCallback }) => {
  const mapRef = useMap();
  return (
    <button
      title={title}
      className="map-button"
      onClick={(e) => {
        onClickCallback(mapRef);
      }}
    >
      {children}
    </button>
  );
};

export default MapButton;
