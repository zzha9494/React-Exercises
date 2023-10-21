import logo from "./logo.svg";
import "./App.css";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import FormContainer from "./components/FormContainer/FormContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MapContainer from "./components/MapContainer/MapContainer";
import ItemPopup from "./components/ItemPopup/ItemPopup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

const theme = createTheme({});
function App() {
  const vm = useSelector((state) => state.global.viewMode);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainAppBar />
        <SnackbarProvider>
          {vm === "volunteer" && <FormContainer />}
        </SnackbarProvider>
        <MapContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
