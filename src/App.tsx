import "./App.css";
import Mapcontainer from "./components/mapcontainer/mapcontainer.component";
import Sidemenu from "./components/sidemenu/sidemenu.component";

function App() {
  return (
    <div className="App">
      <Sidemenu />
      <Mapcontainer />
    </div>
  );
}

export default App;
