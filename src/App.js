import logo from "./logo.svg";
import "./App.css";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const vm = useSelector((state) => state.global.viewMode);

  return (
    <div className="App">
      <MainAppBar />
      CurrentView {vm}
    </div>
  );
}

export default App;
