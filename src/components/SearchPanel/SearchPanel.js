import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SvgIcon } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

function SearchPanel({ setEvents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  const getEventsLocation = async (keywords) => {
    try {
      const response = await fetch("http://localhost:8080/api/event/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords: keywords }),
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
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField
        id="search"
        type="search"
        InputProps={{
          startAdornment: <SvgIcon component={SearchIcon} inheritViewBox />,
        }}
        placeholder="Search"
        fullWidth
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            getEventsLocation(searchTerm);
          }
        }}
      />
    </Box>
  );
}

export default SearchPanel;
