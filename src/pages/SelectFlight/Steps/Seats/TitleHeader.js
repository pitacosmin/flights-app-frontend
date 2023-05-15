import { Box, Typography } from "@mui/material";
import React from "react";
import { SurfieGreen } from "../../../../assets/colors";

function TitleHeader() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 0px",
      }}
      color={SurfieGreen}
    >
      <Typography variant="h5" letterSpacing={"0.1rem"}>
        Pick a seat
      </Typography>
    </Box>
  );
}

export default TitleHeader;
