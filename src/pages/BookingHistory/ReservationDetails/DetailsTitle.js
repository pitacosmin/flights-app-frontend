import { Grid, Typography } from "@mui/material";
import React from "react";

const DetailsTitle = ({ reservation }) => {
  console.log(reservation);
  return (
    <Grid
      container
      direction={"row"}
      alignItems={"flex-end"}
      justifyContent={"space-between"}
      padding="5px 20px"
    >
      <Grid item xs={6}>
        <Typography fontWeight={"bold"} variant="h4" color="#484848">
          Travel plan
        </Typography>
      </Grid>
      <Grid item container direction={"column"} xs={2}>
        <Grid item>
          <Typography variant="caption" fontWeight={"bold"} color="grey">
            PRICE:
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontWeight={"bold"} color="#19159a">
            {reservation?.totalPrice}€
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsTitle;
