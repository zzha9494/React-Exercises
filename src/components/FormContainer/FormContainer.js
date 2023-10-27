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

const steps = ["Basic Information", "Item(s) Detail", "Time & PIN code"];
// dayjs.extend(timezone)
// dayjs.extend(utc);

export default function FormContainer() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formInfo, setFormInfo] = React.useState({});
  const markerPosition = useSelector((state) => state.global.markerPosition);
  const vm = useSelector((state) => state.global.viewMode);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  function reset() {
    dispatch(setMarkerPosition(null));
    setActiveStep(0);
    setFormInfo({});
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
      formInfo.position = markerPosition;

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
          // endTime: "2023-10-18T10:53:51.245+00:00",
          modifyCode: formInfo.pin,
          // description: "sample description",
          volunteer: {
            firstName: formInfo.firstName,
            secondName: formInfo.lastName,
            email: formInfo.email,
            phoneNumber: formInfo.phone,
          },
          location: {
            locationX: formInfo.position.lat,
            locationY: formInfo.position.lng,
          },
          items: [
            {
              name: formInfo.itemName,
              number: 1,
              description: formInfo.description,
              category: formInfo.category,
            },
          ],
        };

        setFormInfo((formInfo) => {
          const { pin, ...rest } = formInfo;
          return rest;
        });

        fetch("http://localhost:8080/api/event/add", {
          method: "POST",
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
      open={markerPosition !== null && vm === "volunteer"}
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
          <IconButton aria-label="delete" onClick={() => reset()}>
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
        </Grid>
      </Grid>
    </Box>
  );
}

function StepTwo({ formInfo, handleFieldChange }) {
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
            label="Description and Address"
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
            {/* <CardMedia
                            component="img"
                            image="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft"
                            alt="green iguana"
                        /> */}
            <ImageIcon sx={{ fontSize: 100, color: "#d3d3d3" }} />
          </Card>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ width: 150 }}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function StepThree({ formInfo, setFormInfo }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ pt: 4 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ p: 1 }}>
            Date & Time
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
