import { Map } from "leaflet";
import { FC, ReactNode } from "react";
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
        e.stopPropagation();
        onClickCallback(mapRef);
      }}
    >
      {children}
    </button>
  );
};

export default MapButton;
