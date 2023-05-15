import { Box, Typography } from "@mui/material";
import React from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { SurfieGreen } from "../../../../assets/colors";

const RouteTitle = ({ originCity, destinationCity }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 0px",
      }}
      color={SurfieGreen}
    >
      <FlightTakeoffIcon style={{ marginRight: "10px" }} />
      <Typography variant="body1" letterSpacing={"0.1rem"}>
        {originCity} to {destinationCity}
      </Typography>
    </Box>
  );
};

export default RouteTitle;
