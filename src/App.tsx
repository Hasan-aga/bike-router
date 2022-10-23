import "./App.css";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import Sidemenu from "./components/sidemenu/sidemenu.component";
import { SearchProvider } from "./contexts/search.context";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Sidemenu />
        <Mapcontainer />
      </SearchProvider>
    </div>
  );
}

export default App;
