import "./mapcontainer.style.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../contexts/search.context";
import { getCoordsFromName } from "../../utils/getCoordsFromName";
import { LatLngExpression, Map } from "leaflet";
import UpdatedMap from "./updatedMap";
import { pointContext } from "../../contexts/point.context";
import Control from "react-leaflet-custom-control";
import MapButton from "../mapButton/mapButton.component";
import { TfiArrowsCorner, TfiTrash, TfiSearch } from "react-icons/tfi";
import Stack from "../stack/stack.component";
import Search from "../search/search.component";

const Mapcontainer = () => {
  const { searchValue } = useContext(searchContext);
  const [coords, setCoords] = useState([52.3727598, 4.8936041]);
  const { setPoints } = useContext(pointContext);
  const [searchIsVisible, setSearchIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const getCoords = async (location: string) => {
      const coords = await getCoordsFromName(location);
      if (!coords) throw new Error("no coordinates!");
      setCoords(coords);
    };
    if (searchValue !== "default") getCoords(searchValue);
    setPoints([]);
  }, [searchValue, setPoints]);

  const viewSearchbar = () => {
    setSearchIsVisible(!searchIsVisible);
  };

  const resetZoomLevel = (mapRef: Map) => {
    mapRef.setZoom(13);
  };
  const removeMarkers = () => {
    setPoints([]);
  };

  return (
    <MapContainer
      className="mapcontainer"
      center={coords as LatLngExpression}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <UpdatedMap coords={coords} />
      <Control prepend position="topleft">
        <Stack>
          <MapButton onClickCallback={viewSearchbar} title="Search location">
            <TfiSearch />
            {searchIsVisible && (
              <Search placeholder="search location" SearchIcon={TfiSearch} />
            )}
          </MapButton>
          <MapButton onClickCallback={resetZoomLevel} title="Reset zoom">
            <TfiArrowsCorner />
          </MapButton>
          <MapButton onClickCallback={removeMarkers} title="Remove all markers">
            <TfiTrash />
          </MapButton>
        </Stack>
      </Control>
    </MapContainer>
  );
};

export default Mapcontainer;
