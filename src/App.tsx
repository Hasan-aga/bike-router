import { useContext } from "react";
import "./App.scss";
import Dashboard from "./components/dashboard/dashboard.component";
import ErrorMessage from "./components/error/errorMessage.component";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import { ChartPointProvider } from "./contexts/chart.context";
import { InclinationProvider } from "./contexts/inclination.context";
import { PathProvider } from "./contexts/path.context";

import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";
import { ToggleChartProvider } from "./contexts/toggleChart.context";
import { ShowErrorProvider } from "./contexts/showError.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <PathProvider>
            <ChartPointProvider>
              <InclinationProvider>
                <ToggleChartProvider>
                  <ShowErrorProvider>
                    <Mapcontainer />
                    <Dashboard />
                    <ErrorMessage />
                  </ShowErrorProvider>
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
