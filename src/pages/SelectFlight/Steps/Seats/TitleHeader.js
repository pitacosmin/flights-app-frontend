import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { SurfieGreen } from "../../../../assets/colors";

function TitleHeader({ handleRandomSeatsPicker }) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0px",
      }}
      color={SurfieGreen}
    >
      <Typography variant="h5" letterSpacing={"0.1rem"}>
        Pick a seat
      </Typography>
      <Button variant="outlined" onClick={handleRandomSeatsPicker}>
        Continue without selecting seats
      </Button>
    </Box>
  );
}

export default TitleHeader;
