import CloudIcon from "@mui/icons-material/Cloud";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./AppBar.scss";

import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {
  ViewModes,
  setMarkerPosition,
  setViewMode,
} from "../../slices/globalSlice";
import Announcements from "../Announcements/Announcements";

function ToggleButtons() {
  const vm = useSelector((state) => state.global.viewMode);
  const dispatch = useDispatch();

  const handleVM = (event, value) => {
    const mode =
      value === "homeless"
        ? ViewModes.HOMELESS
        : value === "volunteer"
        ? ViewModes.VOLUNTEER
        : vm;
    dispatch(setViewMode(mode));
    dispatch(setMarkerPosition(null));
  };

  return (
    <ToggleButtonGroup
      value={vm}
      exclusive
      onChange={handleVM}
      aria-label="text alignment"
    >
      <ToggleButton value="homeless" aria-label="left aligned">
        <Typography variant="button" color="white">
          Homeless
        </Typography>
      </ToggleButton>
      <ToggleButton value="volunteer" aria-label="centered">
        <Typography variant="button" color="white">
          Volunteer
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function MainAppBar() {
  const [weather, setweather] = useState(null);
  useEffect(() => {
    // 发起GET请求
    fetch("http://localhost:8080/api/weather/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 将响应解析为JSON
      })
      .then((data) => {
        // 处理响应数据
        console.log(data);
        setweather(data);
      })
      .catch((error) => {
        // 处理错误
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{}}>
        <Toolbar>
          <Announcements />

          <Typography
            variant="subtitle2"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 10 }}
          >
            {weather && (
              <Stack direction="row">
                <CloudIcon /> &nbsp;&nbsp;&nbsp;
                {weather.temperature}
              </Stack>
            )}
          </Typography>
          <ToggleButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
