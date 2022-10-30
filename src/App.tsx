import "./App.scss";
import DataViz from "./components/dataViz/dataViz.component";
import Sidemenu from "./components/sidemenu/sidemenu.component";
import { ChartPointProvider } from "./contexts/chart.context";
import { PathProvider } from "./contexts/path.context";

import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <PathProvider>
            <ChartPointProvider>
              <Sidemenu />
              <DataViz />
            </ChartPointProvider>
          </PathProvider>
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
