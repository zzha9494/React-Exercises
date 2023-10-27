import React from "react";
import "./MapFilter.scss";
import { Button, Paper, Stack, Typography, Box, Tooltip } from "@mui/material";
import Slider from "@mui/material/Slider";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { teal, red, indigo, blue, grey } from "@mui/material/colors";
import ColorButton from "../ColorButton";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function MapFilter({ events, setEvents, setRadius }) {
  const getEventsLocation = async (color) => {
    try {
      const response = await fetch("http://localhost:8080/api/event/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: color }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const events = await response.json();
      const eventsArray = Object.keys(events).map((key) => events[key]);

      console.log("events", eventsArray);
      setEvents(eventsArray);
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
              startIcon={<ShoppingCartOutlinedIcon />}
              myColor={teal}
              onClick={() => {
                getEventsLocation("green");
              }}
            >
              Water
            </ColorButton>
            <ColorButton
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              myColor={red}
              onClick={() => {
                getEventsLocation("red");
              }}
            >
              Food
            </ColorButton>
            <ColorButton
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              myColor={indigo}
            >
              Food
            </ColorButton>
          </Stack>
          <Typography sx={{ p: 0, flex: 1, fontWeight: "600" }}>
            Category
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <ColorButton
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              myColor={blue}
            >
              Food
            </ColorButton>
            <ColorButton
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              myColor={grey}
            >
              Food
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
            defaultValue={20}
            sx={{ width: "200px" }}
          />
          <Typography gutterBottom sx={{ p: 0, flex: 1, fontWeight: "600" }}>
            Distance
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            slots={{
              valueLabel: ValueLabelComponent,
            }}
            aria-label="custom thumb label"
            defaultValue={20}
            sx={{ width: "200px" }}
          />
        </Box>
        <Box className="btnWrapper">
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            startIcon={<ShoppingCartOutlinedIcon />}
            onClick={() => setEvents(events)}
          >
            Show all (34) items
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default MapFilter;
