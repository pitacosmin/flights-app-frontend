import { CalendarMonth } from "@mui/icons-material";
import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { customToLocaleDateString } from "../../utils/formatDates";

const CalendarButton = ({
  showCalendar,
  handleCalendarOpen,
  departureDate,
  returnDate,
}) => {
  return (
    <Grid item xs={12} id="date-picker-button">
      <Paper elevation={showCalendar ? 2 : 0}>
        <Button
          size="large"
          variant="filledTonal"
          fullWidth
          onClick={handleCalendarOpen}
          style={{ textTransform: "none", padding: 5, height: "7vh" }}
        >
          <Grid item xs={2}>
            <CalendarMonth />
          </Grid>
          <Grid item xs={4}>
            {departureDate
              ? customToLocaleDateString(departureDate)
              : "Select date"}
          </Grid>
          {returnDate && (
            <>
              <Grid item xs={2}>
                to
              </Grid>
              <Grid item xs={4}>
                {customToLocaleDateString(returnDate)}
              </Grid>
            </>
          )}
        </Button>
      </Paper>
    </Grid>
  );
};

export default CalendarButton;
