import React, { useEffect, useState } from "react";
import {
  Popover,
  Box,
  styled,
  Paper,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CloseIcon from "@mui/icons-material/Close";
import waterImg from "../../assets/water.jpg";
import "./ItemPopup.scss";
import { enqueueSnackbar } from "notistack";
import { format } from "date-fns";

const Reminder = styled(Paper)(({ theme, myColor }) => ({
  backgroundColor: myColor,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  color: "#fff",
  fontWeight: 600,
}));

function ItemPopup({ open, onClose, id, selectedId }) {
  const [event, setevent] = useState(null);
  const [daysRemaining, setdaysRemaining] = useState("NAN");
  useEffect(() => {
    if (open) {
      async function getEventInfo() {
        try {
          const response = await fetch("http://localhost:8080/api/event/info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventId: selectedId,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const res = await response.json();

          setevent(res);

          const currentTime = new Date();

          const eventEndTime = new Date(res.endTime);

          const timeDiff = eventEndTime - currentTime;

          const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          setdaysRemaining(daysRemaining);
        } catch (error) {
          console.error("Error fetching event:", error);
          enqueueSnackbar("Error fetching event", {
            variant: "info",
          });
        }
      }
      getEventInfo();
    }
  }, [open]);

  return (
    event && (
      <Popover
        id={id}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{ maxHeight: 600 }}
      >
        <Box className="itemPopupWrapper">
          <Stack
            direction="row"
            spacing={14}
            mb={1}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Reminder myColor="red">
              <AccessTimeOutlinedIcon />
              <Typography variant="body2">
                &nbsp; Expiring in {daysRemaining} day
              </Typography>
            </Reminder>
            <IconButton aria-label="delete" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2">Description</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {event.description}
          </Typography>
          <Typography variant="body2">Ending on</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {format(new Date(event.endTime), "hh:mm:ss a, MMM d, yyyy")}
          </Typography>
          <Typography variant="body2">Address</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {event.location.address}
          </Typography>
          <Typography variant="body2">Contact</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {event.volunteer.firstName + " " + event.volunteer.secondName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {event.volunteer.phoneNumber}
          </Typography>

          {event.items.map((item) => {
            return (
              <Stack
                spacing={1}
                sx={{
                  margin: "30px 0",
                  padding: "20px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "8px",
                }}
              >
                <Box className="itemImage">
                  <img src={item.imageBase64} alt="" />
                </Box>
                <Box>
                  <Typography variant="body2">Item name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Quantity</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.number}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Category</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.category}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Description</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.description}
                  </Typography>
                </Box>
                {/* <Box className="itemInfo">
          <Typography variant="body2">Location</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {item}
          </Typography>
        </Box> */}
                {/* <Box className="itemInfo">
          <Typography variant="body2">Available</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            17:00 - 18:30 August 28
          </Typography>
        </Box> */}
              </Stack>
            );
          })}
        </Box>
      </Popover>
    )
  );
}

export default ItemPopup;
