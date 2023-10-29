import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SvgIcon } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../slices/globalSlice";

function SearchPanel({}) {
  const events = useSelector((state) => state.global.events);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
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

      const res = await response.json();

      dispatch(setEvents(Object.values(res)));
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
          startAdornment: (
            <SvgIcon
              component={SearchIcon}
              inheritViewBox
              onClick={() => getEventsLocation(searchTerm)}
            />
          ),
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
