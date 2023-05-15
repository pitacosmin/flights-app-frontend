import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

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
          style={{ textTransform: "none" }}
          endIcon={<PersonIcon />}
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
