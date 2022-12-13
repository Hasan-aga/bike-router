import { Map } from "leaflet";
import { useRef } from "react";
import {
  FiMapPin,
  FiArrowLeft,
  FiSearch,
  FiMaximize2,
  FiTrash2,
  FiHeart,
} from "react-icons/fi";
import MapButton from "../mapButton/mapButton.component";
import ToggleChartButton from "../mapButton/toggleChartButton.component";
import ToggleThemeButton from "../mapButton/toggleThemeButton.component";
import Search from "../search/search.component";
import Stack from "../stack/stack.component";

type Props = {
  toggleDarkTheme: () => void;
  darkTheme: boolean;
  getCurrentLocation: (mapRef: Map) => void;
  toggleSearchbar: () => void;
  searchIsVisible: boolean;
  resetZoomLevel: (mapRef: Map) => void;
  removeMarkers: () => void;
};

const UI = ({
  toggleDarkTheme,
  darkTheme,
  getCurrentLocation,
  toggleSearchbar,
  searchIsVisible,
  resetZoomLevel,
  removeMarkers,
}: Props) => {
  const searchbarRef = useRef(null);

  return (
    <Stack>
      <ToggleThemeButton
        toggleDarkTheme={toggleDarkTheme}
        darkTheme={darkTheme}
      />
      <MapButton onClickCallback={getCurrentLocation} title="Locate">
        <FiMapPin />
      </MapButton>
      <Stack direction="horizontal">
        <MapButton onClickCallback={toggleSearchbar} title="Search location">
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
      <MapButton onClickCallback={removeMarkers} title="Remove all markers">
        <FiTrash2 />
      </MapButton>
      <MapButton onClickCallback={() => ""} title="About">
        <a href="/about">
          <FiHeart />
        </a>
      </MapButton>
      <ToggleChartButton />
    </Stack>
  );
};

export default UI;
