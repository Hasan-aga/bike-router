import "./App.scss";
import Dashboard from "./components/dashboard/dashboard.component";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import { ChartPointProvider } from "./contexts/chart.context";
import { InclinationProvider } from "./contexts/inclination.context";
import { PathProvider } from "./contexts/path.context";

import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";
import { ToggleChartProvider } from "./contexts/toggleChart.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <PathProvider>
            <ChartPointProvider>
              <InclinationProvider>
                <ToggleChartProvider>
                  <Mapcontainer />
                  <Dashboard />
                </ToggleChartProvider>
              </InclinationProvider>
            </ChartPointProvider>
          </PathProvider>
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
