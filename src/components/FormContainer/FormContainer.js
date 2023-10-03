import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './FormContainer.scss'
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PinField from "react-pin-field"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ImageIcon from '@mui/icons-material/Image';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { Modal } from "@mui/material";
import { markerPosition, setMarkerPosition } from "../../slices/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

const steps = ['Basic Information', 'Item(s) Detail', 'Time & PIN code'];

export default function FormContainer() {

    const [activeStep, setActiveStep] = React.useState(0);
    const markerPosition = useSelector((state) => state.global.markerPosition);
    const dispatch = useDispatch();
    function reset() {
        dispatch(setMarkerPosition(null))
        setActiveStep(0)
    }
    const handleNext = () => {



        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep + 1 === steps.length) {
            reset()
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    return (
        <Modal open={markerPosition !== null} className="modal">
            <Paper elevation={3} className='main-container' sx={{ width: 800, height: 500, p: 1 }}>
                <Stack direction='row' spacing={3} sx={{ m: 2 }} >
                    <Typography variant="h6" sx={{ p: 0, flex: 1 }}>
                        Submit an item
                    </Typography>
                    <IconButton aria-label="delete"
                        onClick={() => reset()}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
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
                    {activeStep === 0 && <StepOne />}
                    {activeStep === 1 && <StepTwo />}
                    {activeStep === 2 && <StepThree />}
                </Paper>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />


                    <Button onClick={handleNext} disabled={activeStep === steps.length}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>

            </Paper>
        </Modal>
    );
}



function StepOne() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ pt: 4 }}>
                <Grid item xs={6}>

                    <TextField id="outlined-search" label="First Name" type="search" sx={{ width: '90%', m: 1 }} />
                    <TextField id="outlined-search" label="Phone Nunmber" type="search" sx={{ width: '90%', m: 1 }} />
                    <TextField id="outlined-search" label="Email Address" type="search" sx={{ width: '90%', m: 1 }} />

                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField id="outlined-search" label="Last Name" type="search" sx={{ width: '90%', m: 1 }} />


                </Grid>

            </Grid>
        </Box>
    )
}





function StepTwo() {

    const categories = [
        {
            value: 'Foods',
            label: 'Foods',
        },
        {
            value: 'Drinks',
            label: 'Drinks',
        },
        {
            value: 'Medical Supplies',
            label: 'Medical Supplies',
        },
        {
            value: 'Others',
            label: 'Others',
        },
    ];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ pt: 4 }}>
                <Grid item xs={6}>

                    <TextField id="outlined-search" label="Item Name" type="search" sx={{ width: '90%', m: 1 }} />
                    <TextField
                        id="outlined-select-category"
                        select
                        label="Category"
                        sx={{ width: '90%', m: 1 }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={5}
                        sx={{ width: '90%', m: 1 }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{ width: '90%', m: 1, maxHeight: 250, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <CardMedia
                            component="img"
                            image="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft"
                            alt="green iguana"
                        /> */}
                        <ImageIcon sx={{ fontSize: 100, color: '#d3d3d3' }} />
                    </Card>

                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: 150 }}>
                        Upload file
                        <VisuallyHiddenInput type="file" />


                    </Button>

                </Grid>

            </Grid>
        </Box>
    )
}


function StepThree() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ pt: 4 }}>

                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ p: 1 }}>
                        Date & Time
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ width: '60%', p: 1 }} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            sx={{ width: '60%', p: 1 }}
                        />
                    </LocalizationProvider>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ p: 1 }}>
                        PIN
                    </Typography>

                    <PinField className='pin-field' length={4} validate={/^[0-9]$/} />
                    <div><Typography variant="caption" sx={{ p: 1 }}>
                        Enter a 4 digits PIN code
                    </Typography></div>
                </Grid>

            </Grid>
        </Box>
    )
}
