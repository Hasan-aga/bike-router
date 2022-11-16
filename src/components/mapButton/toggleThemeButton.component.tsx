import { FiSun, FiMoon } from "react-icons/fi";

const ToggleThemeButton = ({
  toggleDarkTheme,
  darkTheme,
}: {
  toggleDarkTheme: () => void;
  darkTheme: boolean;
}) => {
  return (
    <button
      className="map-button"
      onClick={(e) => {
        e.stopPropagation();
        toggleDarkTheme();
      }}
    >
      {darkTheme ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ToggleThemeButton;
