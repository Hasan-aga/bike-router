import "./mapcontainer.style.scss";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  MapContainerProps,
} from "react-leaflet";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { searchContext } from "../../contexts/search.context";
import { getCoordsFromName } from "../../utils/getCoordsFromName";
import { LatLngExpression, Map } from "leaflet";
import UpdatedMap from "./updatedMap";

const Mapcontainer = () => {
  const { searchValue, setSearchValue } = useContext(searchContext);
  const [coords, setCoords] = useState([52.3727598, 4.8936041]);

  useEffect(() => {
    const getCoords = async (location: string) => {
      const coords = await getCoordsFromName(location);
      console.log(coords);
      if (!coords) throw new Error("no coordinates!");
      setCoords(coords);
    };

    getCoords(searchValue);
  }, [searchValue]);

  return (
    <MapContainer
      className="mapcontainer"
      center={coords as LatLngExpression}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords as LatLngExpression}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <UpdatedMap coords={coords} />
    </MapContainer>
  );
};

export default Mapcontainer;
