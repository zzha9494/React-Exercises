import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./FormContainer.scss";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PinField from "react-pin-field";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ImageIcon from "@mui/icons-material/Image";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Modal } from "@mui/material";
import { markerPosition, setMarkerPosition } from "../../slices/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { setEvents } from "../../slices/globalSlice";

const steps = ["Basic Information", "Item Detail", "Time & PIN code"];
// dayjs.extend(timezone)
// dayjs.extend(utc);

export default function FormContainer({
  formOpen,
  setFormOpen,
  eventId,
  formModified,
  setFormModified,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formInfo, setFormInfo] = React.useState({});
  const markerPosition = useSelector((state) => state.global.markerPosition);
  const vm = useSelector((state) => state.global.viewMode);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (formModified) {
      setFormInfo({
        firstName: formModified.volunteer.firstName,
        lastName: formModified.volunteer.secondName,
        phone: formModified.volunteer.phoneNumber,
        email: formModified.volunteer.email,
        address: formModified.location.address,
        event_description: formModified.event_description,
        itemName: formModified.items[0].name,
        category: formModified.items[0].category,
        description: formModified.items[0].description,
        time: formModified.startTime,
        // image: formModified.item[0].imageBase64,
        date: formModified.startTime,
        endDate: formModified.endTime,
        endTime: formModified.endTime,
        position: {
          lat: formModified.location.latitude,
          lng: formModified.location.longitude,
        },
        eventId: eventId,
      });

      setFormModified(null);
    }
  }, [formModified]);

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
      console.log(Object.values(res));

      dispatch(setEvents(Object.values(res)));
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  function reset() {
    dispatch(setMarkerPosition(null));
    setActiveStep(0);
    setFormInfo({});
    getEventsLocation();
  }
  const handleNext = () => {
    if (activeStep == 0) {
      if (
        !(
          formInfo.firstName &&
          formInfo.lastName &&
          formInfo.phone &&
          formInfo.email
        )
      ) {
        enqueueSnackbar("Please input information.", {
          variant: "info",
        });
        return;
      }
    } else if (activeStep == 1) {
      if (!(formInfo.itemName && formInfo.category && formInfo.description)) {
        enqueueSnackbar("Please input information.", {
          variant: "info",
        });
        return;
      }
    } else if (activeStep == 2) {
      if (!(formInfo.time && formInfo.pin)) {
        enqueueSnackbar("Please input information.", {
          variant: "info",
        });
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep + 1 === steps.length) {
      formInfo.date = formInfo.date ? formInfo.date : new dayjs();
      formInfo.position = formInfo.position
        ? formInfo.position
        : markerPosition;

      let startTime = formInfo.time
        .year(formInfo.date.year())
        .month(formInfo.date.month())
        .date(formInfo.date.date());
      if (startTime < new Date()) {
        enqueueSnackbar("Time invalid.", {
          variant: "info",
        });
        return;
      }

      let endTime = formInfo.endTime
        .year(formInfo.endDate.year())
        .month(formInfo.endDate.month())
        .date(formInfo.endDate.date());
      if (endTime < startTime) {
        enqueueSnackbar("Time invalid.", {
          variant: "info",
        });
        return;
      }

      if (true) {
        // for uploading image, currently do not know how it works.
        // let testformInfo = {
        //   firstName: "John",
        //   lastName: "West",
        //   phone: "123456",
        //   email: "test@test.com",
        //   itemName: "water",
        //   category: "Drinks",
        //   description: "ddd",
        //   time: "2023-10-09T13:05:00.000Z",
        //   pin: "1111",
        //   date: "2023-10-10T08:23:14.317Z",
        //   position: {
        //     lat: -33.8651650542566,
        //     lng: 151.20987461480462,
        //   },
        // };

        let form = {
          startTime: startTime,
          endTime: endTime,
          modifyCode: formInfo.pin,
          description: formInfo.event_description,

          volunteer: {
            firstName: formInfo.firstName,
            secondName: formInfo.lastName,
            email: formInfo.email,
            phoneNumber: formInfo.phone,
          },
          location: {
            city: "Sydney",
            address: formInfo.address,
            latitude: formInfo.position.lat,
            longitude: formInfo.position.lng,
          },
          items: [
            {
              name: formInfo.itemName,
              number: 1,
              description: formInfo.description,
              category: formInfo.category,
              imageBase64: formInfo.image,
            },
          ],
        };

        setFormInfo((formInfo) => {
          const { pin, ...rest } = formInfo;
          return rest;
        });
        let URL = formInfo.eventId
          ? "http://localhost:8080/api/event/update"
          : "http://localhost:8080/api/event/add";
        let method = formInfo.eventId ? "PUT" : "POST";
        fetch(URL, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((res) => {
            if (res.status == 200) {
              enqueueSnackbar("Event added successfully.", {
                variant: "success",
              });
              reset();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .catch((error) => {
            console.error(error);
            enqueueSnackbar("Fail to add event.", {
              variant: "warning",
            });
          });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFieldChange = (event) => {
    const fieldName = event.target.id || event.target.name;
    const fieldValue = event.target.value;

    setFormInfo((formInfo) => ({
      ...formInfo,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <Modal
      open={(formOpen || markerPosition != null) && vm === "volunteer"}
      className="modal"
    >
      <Paper
        elevation={3}
        className="main-container"
        sx={{ width: 800, height: 500, p: 1 }}
      >
        <Stack direction="row" spacing={3} sx={{ m: 2 }}>
          <Typography variant="h6" sx={{ p: 0, flex: 1 }}>
            Submit an item
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => {
              reset();
              setFormOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} sx={{ margin: "0 20px 0 20px" }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        <Paper elevation={0} sx={{ flex: 1, m: 1 }}>
          {activeStep === 0 && (
            <StepOne
              formInfo={formInfo}
              handleFieldChange={handleFieldChange}
            />
          )}
          {activeStep === 1 && (
            <StepTwo
              formInfo={formInfo}
              handleFieldChange={handleFieldChange}
              setFormInfo={setFormInfo}
            />
          )}
          {activeStep === 2 && (
            <StepThree formInfo={formInfo} setFormInfo={setFormInfo} />
          )}
        </Paper>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button onClick={handleNext} disabled={activeStep === steps.length}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

function StepOne({ formInfo, handleFieldChange }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ pt: 4 }}>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            label="First Name"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.firstName}
            onChange={handleFieldChange}
            required
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.lastName}
            onChange={handleFieldChange}
            required
          />
          <TextField
            id="address"
            label="Address"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.address}
            onChange={handleFieldChange}
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="phone"
            label="Phone Nunmber"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.phone}
            onChange={handleFieldChange}
            required
          />
          <TextField
            id="email"
            label="Email Address"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.email}
            onChange={handleFieldChange}
            required
          />
          <TextField
            id="event_description"
            label="Event Description"
            multiline
            rows={4}
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.event_description}
            onChange={handleFieldChange}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function StepTwo({ formInfo, handleFieldChange, setFormInfo }) {
  const categories = [
    {
      value: "Foods",
      label: "Foods",
    },
    {
      value: "Drinks",
      label: "Drinks",
    },
    {
      value: "Medical Supplies",
      label: "Medical Supplies",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ pt: 4 }}>
        <Grid item xs={6}>
          <TextField
            id="itemName"
            label="Item Name"
            type="search"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.itemName}
            onChange={handleFieldChange}
            required
          />
          <TextField
            // id="category"
            name="category"
            select
            label="Category"
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.category}
            onChange={handleFieldChange}
            required
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="description"
            label="Item Description"
            multiline
            rows={5}
            sx={{ width: "90%", m: 1 }}
            value={formInfo?.description}
            onChange={handleFieldChange}
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "90%",
              m: 1,
              maxHeight: 250,
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formInfo.url ? (
              <img src={formInfo.image} alt="Uploaded photo" />
            ) : (
              <ImageIcon sx={{ fontSize: 100, color: "#d3d3d3" }} />
            )}
          </Card>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ width: 150 }}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                // const url = URL.createObjectURL(file);

                const reader = new FileReader();
                reader.onload = () => {
                  const base64String = reader.result;
                  setFormInfo({
                    ...formInfo,
                    // file: file,
                    // url: url,
                    image: base64String,
                  });
                };

                reader.readAsDataURL(file);
              }}
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function StepThree({ formInfo, setFormInfo }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ p: 1 }}>
            Start Time
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "60%", p: 1 }}
              value={formInfo?.date || new dayjs()}
              onChange={(date) => setFormInfo({ ...formInfo, date: date })}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{ width: "60%", p: 1 }}
              value={formInfo?.time}
              onChange={(time) => setFormInfo({ ...formInfo, time: time })}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ p: 1 }}>
            End Time
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "60%", p: 1 }}
              value={formInfo?.endDate || new dayjs()}
              onChange={(endDate) =>
                setFormInfo({ ...formInfo, endDate: endDate })
              }
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{ width: "60%", p: 1 }}
              value={formInfo?.endTime}
              onChange={(endTime) =>
                setFormInfo({ ...formInfo, endTime: endTime })
              }
            />
          </LocalizationProvider>
          <Typography variant="h6" sx={{ p: 1 }}>
            PIN
          </Typography>

          <PinField
            className="pin-field"
            length={4}
            validate={/^[0-9]$/}
            onComplete={(pin) => {
              setFormInfo({ ...formInfo, pin: pin });
            }}
          />
          <div>
            <Typography variant="caption" sx={{ p: 1 }}>
              Enter a 4 digits PIN code
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
