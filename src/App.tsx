import "./App.css";
import DataViz from "./components/dataViz/dataViz.component";
import Sidemenu from "./components/sidemenu/sidemenu.component";

import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <Sidemenu />
          <DataViz />
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
