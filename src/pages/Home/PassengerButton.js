import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import Passengers from "../../assets/passengers.png";

const PassengerButton = ({
  passengers,
  showPassengers,
  handlePassengersOpen,
}) => {
  return (
    <Grid item xs={12} id="passengers-button">
      <Paper elevation={showPassengers ? 2 : 0}>
        <Button
          size="large"
          variant="filledTonal"
          fullWidth
          onClick={handlePassengersOpen}
          style={{
            textTransform: "none",
            border: "solid 2px lightgrey",
          }}
          endIcon={
            <img
              src={Passengers}
              alt="passengers-icon"
              style={{ maxHeight: "30px", maxWidth: "30px" }}
            />
          }
        >
          <Grid container>
            <Grid item container>
              Passengers
            </Grid>
            <Grid container item direction="row" spacing={1.5}>
              {Object.entries(passengers).map(
                ([ageGroup, count]) =>
                  count > 0 && (
                    <Grid item key={ageGroup}>
                      {count} {ageGroup}
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        </Button>
      </Paper>
    </Grid>
  );
};

export default PassengerButton;
