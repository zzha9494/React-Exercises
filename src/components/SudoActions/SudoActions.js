import React, { useState } from "react";
import "./SudoActions.scss";
import { Button, IconButton, Popover, Stack, Typography } from "@mui/material";
import PinField from "react-pin-field";
import ClearIcon from "@mui/icons-material/Clear";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setEvents } from "../../slices/globalSlice";
export default function SudoActions({
  id,
  eventId,
  open,
  onClose,
  setFormModified,
}) {
  const [formInfo, setFormInfo] = useState({ pin: "" });
  const dispatch = useDispatch();

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
        const getEventsLocation = async (color) => {
          try {
            const response = await fetch(
              "http://localhost:8080/api/event/get",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: color
                  ? JSON.stringify({ color: color })
                  : JSON.stringify({}),
              },
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const res = await response.json();
            console.log(Object.values(res));

            dispatch(setEvents(Object.values(res)));
            onClose();
          } catch (error) {
            console.error("Error fetching announcements:", error);
          }
        };
        getEventsLocation();
      } else {
        enqueueSnackbar("Unknown error.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleModify = () => {
    setFormModified(null);
    const url = "http://localhost:8080/api/event/checkCode";

    const data = {
      modify_code: formInfo.pin,
      event_id: eventId,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status == 200) {
          enqueueSnackbar("Pin validate successfully.", {
            variant: "success",
          });
          return res.json();
        } else {
          throw new Error("Wrong Pin.");
        }
      })
      .then((form) => {
        // set the form here
        setFormModified(form);
        // close
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Fail to modify event.", {
          variant: "warning",
        });
      });
  };

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
        <IconButton disabled={formInfo.pin.length !== 4} onClick={handleModify}>
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Stack>
    </Popover>
  );
}
