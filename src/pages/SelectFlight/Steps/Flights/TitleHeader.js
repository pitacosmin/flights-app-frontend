import { SurfieGreen } from "../../../../assets/colors";
import { Box, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const TitleHeader = ({ originCity, destinationCity }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 0px",
      }}
      color={SurfieGreen}
    >
      <FlightTakeoffIcon style={{ marginRight: "10px" }} />
      <Typography variant="h5" letterSpacing={"0.1rem"}>
        {originCity} to {destinationCity}
      </Typography>
    </Box>
  );
};

export default TitleHeader;
