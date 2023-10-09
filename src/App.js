import logo from "./logo.svg";
import "./App.css";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import FormContainer from "./components/FormContainer/FormContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MapContainer from './components/MapContainer/MapContainer';
import ItemPopup from './components/ItemPopup/ItemPopup';

function App() {
  const vm = useSelector((state) => state.global.viewMode);

  return (
    <div className="App">
      <MainAppBar />
      {vm === 'volunteer' && <FormContainer />}
      <MapContainer />
    </div>
  );
}

export default App;
