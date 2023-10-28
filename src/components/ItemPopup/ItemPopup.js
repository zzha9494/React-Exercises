import React from "react";
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

function ItemPopup({ open, onClose, id }) {
  return (
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
    >
      <Box className="itemPopupWrapper">
        <Stack direction="row" spacing={14} mb={1}>
          <Reminder myColor="red">
            <AccessTimeOutlinedIcon />
            <Typography variant="body2">Expiring in 1 day</Typography>
          </Reminder>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={1}>
          <Box className="itemImage">
            <img src={waterImg} alt="" />
          </Box>
          <Box>
            <Typography variant="body2">Item name</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              AUSTRALIAN NATURAL SPRING WATER
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Quantity</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              1 BOX
            </Typography>
          </Box>
          <Box className="itemInfo">
            <Typography variant="body2">Location</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              201 Sample St
            </Typography>
          </Box>
          <Box className="itemInfo">
            <Typography variant="body2">Available</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              17:00 - 18:30 August 28
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Popover>
  );
}

export default ItemPopup;
