import React from "react";
import "./MapFilter.scss";
import { Button, Paper, Stack, Typography, Box, Tooltip } from "@mui/material";
import Slider from "@mui/material/Slider";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { teal, red, indigo, blue, grey, yellow } from "@mui/material/colors";
import ColorButton from "../ColorButton";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import CoffeeIcon from "@mui/icons-material/Coffee";
import MedicationIcon from "@mui/icons-material/Medication";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../slices/globalSlice";
function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={`${value} km`}>
      {children}
    </Tooltip>
  );
}

function MapFilter({ events1, setEvents1, setRadius }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.global.events);

  const getEventsLocation = async (color) => {
    try {
      const response = await fetch("http://localhost:8080/api/event/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: color ? JSON.stringify({ color: color }) : JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      dispatch(setEvents(Object.values(res)));
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };
  return (
    <Paper elevation={3} className="mapFilterWrapper">
      <Stack direction="row" spacing={8} sx={{ m: 2 }}>
        <Typography variant="h6" sx={{ p: 1, flex: 1 }}>
          Filter
        </Typography>
        <Box sx={{ p: 1, textAlign: "left" }}>
          <Typography sx={{ p: 0, flex: 1, fontWeight: "600" }}>
            Category
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
            <ColorButton
              variant="contained"
              startIcon={<CoffeeIcon />}
              myColor={teal}
              onClick={() => {
                getEventsLocation("green");
              }}
            >
              Drinks
            </ColorButton>
            <ColorButton
              variant="contained"
              startIcon={<LunchDiningIcon />}
              myColor={red}
              onClick={() => {
                getEventsLocation("red");
              }}
            >
              Foods
            </ColorButton>
            <ColorButton
              variant="contained"
              startIcon={<MedicationIcon />}
              myColor={blue}
              onClick={() => {
                getEventsLocation("blue");
              }}
            >
              Medical Supplies
            </ColorButton>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <ColorButton
              variant="contained"
              startIcon={<MoreHorizIcon />}
              myColor={yellow}
              onClick={() => {
                getEventsLocation("yellow");
              }}
            >
              Others
            </ColorButton>
          </Stack>
        </Box>
        <Box sx={{ p: 1, textAlign: "left" }}>
          <Typography gutterBottom sx={{ p: 0, flex: 1, fontWeight: "600" }}>
            Distance
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            slots={{
              valueLabel: ValueLabelComponent,
            }}
            aria-label="custom thumb label"
            defaultValue={0}
            min={0}
            max={15}
            step={1}
            sx={{ width: "200px" }}
            onChange={(e) => setRadius(e.target.value)}
          />
          {/* <Typography gutterBottom sx={{ p: 0, flex: 1, fontWeight: '600' }}>
            Distance
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            slots={{
              valueLabel: ValueLabelComponent,
            }}
            aria-label="custom thumb label"
            defaultValue={20}
            sx={{ width: '200px' }}
          /> */}
        </Box>
        <Box className="btnWrapper">
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => getEventsLocation()}
          >
            Show all items
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default MapFilter;
