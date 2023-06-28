import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Man from "../../../assets/man.png";
import Woman from "../../../assets/woman.png";
import Backpack from "../../../assets/backpack.png";
import Seat from "../../../assets/seat.png";

const PassengerContent = ({ passenger, isReturn }) => {
  return (
    <Box>
      <Box
        bgcolor={"#f1eff2"}
        padding={"10px 40px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        {isReturn ? (
          <div style={{ height: "50px", width: "50px", marginRight: "10px" }} />
        ) : passenger.title === "Mr" ? (
          <img
            src={Man}
            alt="man"
            style={{ maxHeight: "50px", maxWidth: "50px", marginRight: "10px" }}
          />
        ) : (
          <img
            src={Woman}
            alt="woman"
            style={{ maxHeight: "50px", maxWidth: "50px", marginRight: "10px" }}
          />
        )}

        {isReturn ? null : (
          <Typography variant="h6" fontWeight={"bold"} color={"#19159a"}>
            {passenger.firstName} {passenger.lastName}
          </Typography>
        )}
      </Box>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"20px 40px"}
      >
        <Grid
          item
          xs={5}
          container
          direction={"column"}
          alignItems={"flex-start"}
        >
          <img
            src={Backpack}
            alt="backpack"
            style={{
              maxHeight: "50px",
              maxWidth: "50px",
              margin: "0px 10px 5px 0px",
            }}
          />
          <Typography variant="body2">1x Free carry-on bag</Typography>
          <Typography variant="caption">(40x20x25 cm)</Typography>
        </Grid>
        <Grid item xs={3} container alignItems={"flex-end"}>
          <img
            src={Seat}
            alt="seat"
            style={{
              maxHeight: "50px",
              maxWidth: "50px",
              marginRight: "10px",
              transform: "scaleX(-1)",
            }}
          />
          <Typography variant="h6" fontWeight={"bold"} color={"#19159a"}>
            {isReturn
              ? passenger.returnSeatNumber
              : passenger.departureSeatNumber}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassengerContent;
