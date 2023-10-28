import React, { useState } from "react";
import "./SudoActions.scss";
import { Button, IconButton, Popover, Stack, Typography } from "@mui/material";
import PinField from "react-pin-field";
import ClearIcon from "@mui/icons-material/Clear";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
export default function SudoActions({ id, eventId, open, onClose }) {
  const [formInfo, setFormInfo] = useState({ pin: "" });

  async function handleDelete() {
    const url = "http://localhost:8080/api/event/delete";

    const data = {
      modify_code: formInfo.pin,
      event_id: eventId,
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.text();
        if (responseData === "delete success") {
          enqueueSnackbar("Successfully deleted the event.", {
            variant: "success",
          });
        } else if (responseData === "incorrect modify code") {
          enqueueSnackbar("Wrong PIN code, please try again.", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("Unknown error.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      <Stack direction="row" sx={{ m: 1 }} justifyContent="space-between">
        {" "}
        <Typography variant="subtitle2" sx={{ m: 1 }}>
          Please enter your PIN:
        </Typography>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <div style={{ margin: 10 }}>
        <PinField
          className="pin-field"
          length={4}
          validate={/^[0-9]$/}
          onChange={(pin) => {
            setFormInfo({ ...formInfo, pin: pin });
          }}
        />
      </div>
      <Stack direction="row" justifyContent="flex-end" sx={{ m: 1 }}>
        <IconButton disabled={formInfo.pin.length !== 4} onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton disabled={formInfo.pin.length !== 4}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Stack>
    </Popover>
  );
}
