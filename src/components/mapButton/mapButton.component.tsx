import { FC, ReactNode } from "react";
import "./mapButton.style.scss";

interface Props {
  title?: string;
  children: ReactNode;
}

const MapButton: FC<Props> = ({ children }) => {
  return <button className="map-button">{children}</button>;
};

export default MapButton;
