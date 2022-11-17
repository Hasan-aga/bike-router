import "./mapcontainer.style.tsx";
import { MapContainer, TileLayer } from "react-leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { searchContext } from "../../contexts/search.context";
import { getCoordsFromName } from "../../utils/getCoordsFromName";
import { LatLngExpression, Map } from "leaflet";
import UpdatedMap from "./updatedMap";
import { pointContext } from "../../contexts/point.context";
import Control from "react-leaflet-custom-control";
import MapButton from "../mapButton/mapButton.component";
import {
  FiMaximize2,
  FiTrash2,
  FiSearch,
  FiArrowLeft,
  FiMapPin,
} from "react-icons/fi";
import Stack from "../stack/stack.component";
import Search from "../search/search.component";
import ToggleChartButton from "../mapButton/toggleChartButton.component";
import { CustomMap } from "./mapcontainer.style";
import useToggle from "../../hooks/useToggle.hook";
import ToggleThemeButton from "../mapButton/toggleThemeButton.component";
import { showErrorContext } from "../../contexts/showError.context";

const Mapcontainer = () => {
  const { searchValue } = useContext(searchContext);
  const [coords, setCoords] = useState([52.3727598, 4.8936041]);
  const { setPoints } = useContext(pointContext);
  const [searchIsVisible, setSearchIsVisible] = useState<boolean>(false);
  const searchbarRef = useRef(null);
  const [darkTheme, toggleDarkTheme] = useToggle(true);
  const { errorMessage, setErrorMessage } = useContext(showErrorContext);

  useEffect(() => {
    const getCoords = async (location: string) => {
      const coords = await getCoordsFromName(location);
      if (!coords) throw new Error("no coordinates!");
      setCoords(coords);
    };
    if (searchValue !== "default") getCoords(searchValue);
    setPoints([]);
  }, [searchValue, setPoints]);

  const toggleSearchbar = () => {
    setSearchIsVisible(!searchIsVisible);
  };

  const resetZoomLevel = (mapRef: Map) => {
    mapRef.setZoom(13);
  };
  const removeMarkers = () => {
    setPoints([]);
  };

  const getCurrentLocation = (mapRef: Map) => {
    console.log("getting current location...");

    navigator.geolocation.getCurrentPosition(
      function (position) {
        // case success
        const {
          coords: { latitude, longitude },
        } = position;
        console.log(latitude, longitude);
        mapRef.setView({ lat: latitude, lng: longitude });
      },
      function () {
        // case failure
        !errorMessage && setErrorMessage("Could not get position!");
      }
    );
  };

  return (
    <CustomMap darkTheme={darkTheme}>
      <MapContainer
        className="mapcontainer"
        center={coords as LatLngExpression}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdatedMap coords={coords} />
        <Control prepend position="topleft">
          <Stack>
            <ToggleThemeButton
              toggleDarkTheme={toggleDarkTheme}
              darkTheme={darkTheme}
            />
            <MapButton onClickCallback={getCurrentLocation} title="Locate">
              <FiMapPin />
            </MapButton>
            <Stack direction="horizontal">
              <MapButton
                onClickCallback={toggleSearchbar}
                title="Search location"
              >
                {searchIsVisible ? <FiArrowLeft /> : <FiSearch />}
              </MapButton>
              <div className="search-wrapper" ref={searchbarRef}>
                {searchIsVisible && (
                  <Search placeholder="search location" SearchIcon={FiSearch} />
                )}
              </div>
            </Stack>
            <MapButton onClickCallback={resetZoomLevel} title="Reset zoom">
              <FiMaximize2 />
            </MapButton>
            <MapButton
              onClickCallback={removeMarkers}
              title="Remove all markers"
            >
              <FiTrash2 />
            </MapButton>
            <ToggleChartButton />
          </Stack>
        </Control>
      </MapContainer>
    </CustomMap>
  );
};

export default Mapcontainer;
