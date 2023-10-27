import { styled } from "@mui/material";
import { Button } from "@mui/material";

const ColorButton = styled(Button)(({ theme, myColor }) => ({
  color: theme.palette.getContrastText(myColor[500]),
  backgroundColor: myColor[500],
  "&:hover": {
    backgroundColor: myColor[700],
  },
  textTransform: "none",
}));

export default ColorButton;
