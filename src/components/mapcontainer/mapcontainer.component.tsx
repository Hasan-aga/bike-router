import "./mapcontainer.style.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../contexts/search.context";
import { getCoordsFromName } from "../../utils/getCoordsFromName";
import { LatLngExpression } from "leaflet";
import UpdatedMap from "./updatedMap";
import { pointContext } from "../../contexts/point.context";

const Mapcontainer = () => {
  const { searchValue } = useContext(searchContext);
  const [coords, setCoords] = useState([52.3727598, 4.8936041]);
  const { setPoints } = useContext(pointContext);

  useEffect(() => {
    const getCoords = async (location: string) => {
      const coords = await getCoordsFromName(location);
      if (!coords) throw new Error("no coordinates!");
      setCoords(coords);
    };

    getCoords(searchValue);
    setPoints([]);
  }, [searchValue, setPoints]);

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

      <UpdatedMap coords={coords} />
    </MapContainer>
  );
};

export default Mapcontainer;
