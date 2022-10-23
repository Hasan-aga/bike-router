import "./App.css";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import Sidemenu from "./components/sidemenu/sidemenu.component";
import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <Sidemenu />
          <Mapcontainer />
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
