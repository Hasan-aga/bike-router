import { useEffect } from "react";
import "./App.scss";
import Dashboard from "./components/dashboard/dashboard.component";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import { ChartPointProvider } from "./contexts/chart.context";
import { InclinationProvider } from "./contexts/inclination.context";
import { PathProvider } from "./contexts/path.context";

import { PointProvider } from "./contexts/point.context";
import { SearchProvider } from "./contexts/search.context";

function App() {
  function setPageHeight() {
    const { innerHeight } = window;
    let root = document.documentElement;
    const heightPx = `${innerHeight}px`;
    console.log(heightPx);

    root.style.setProperty("--doc-height", heightPx);
  }

  useEffect(() => {
    setPageHeight();
  }, []);

  return (
    <div className="App">
      <SearchProvider>
        <PointProvider>
          <PathProvider>
            <ChartPointProvider>
              <InclinationProvider>
                <Mapcontainer />
                <Dashboard />
              </InclinationProvider>
            </ChartPointProvider>
          </PathProvider>
        </PointProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
