import "./AppBar.scss";
import { useDispatch } from "react-redux";

import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector } from "react-redux";
import { ViewModes, setViewMode, setMarkerPosition } from "../../slices/globalSlice";

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
        <NaturePeopleIcon />
      </ToggleButton>
      <ToggleButton value="volunteer" aria-label="centered">
        <VolunteerActivismIcon />
      </ToggleButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        a
      </Typography>
    </ToggleButtonGroup>
  );
}

export default function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
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
