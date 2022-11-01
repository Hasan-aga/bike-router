import "./App.scss";
import Dashboard from "./components/dashboard/dashboard.component";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
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
              <Mapcontainer />
              <Dashboard />
            </ChartPointProvider>
          </PathProvider>
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
