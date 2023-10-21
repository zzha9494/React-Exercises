import { useDispatch } from "react-redux";
import "./AppBar.scss";

import React, { useState } from "react";

import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{}}>
        <Toolbar>
          <Announcements />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <ToggleButtons />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
