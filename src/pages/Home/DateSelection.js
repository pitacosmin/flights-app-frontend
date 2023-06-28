import { Flight } from "@mui/icons-material";
import { Button, Divider, Grid, Stack } from "@mui/material";
import React from "react";
import { Calendar } from "react-date-range";
import { SurfieGreen } from "../../assets/colors";

const DateSelection = ({
  departureDate,
  setDepartureDate,
  disabledDepartureDates,
  disabledArrivalDates,
  returnDate,
  setReturnDate,
  handleCalendarClose,
  handleClearDates,
}) => {
  return (
    <Grid container item xs={8} id="calendar-grid" style={{ flex: "1" }}>
      <Stack className="calendar-container">
        <Stack direction="row" spacing={2}>
          <Stack alignItems="flex-start" spacing={1.5}>
            <Stack direction="row">
              <Flight
                style={{ transform: "rotate(90deg)", color: SurfieGreen }}
              />
              <>Select departure date</>
            </Stack>
            <Divider flexItem style={{ backgroundColor: "black" }} />
            <Calendar
              onChange={(item) => setDepartureDate(item)}
              minDate={new Date()}
              date={departureDate}
              disabledDates={disabledDepartureDates}
              dateDisplayFormat="d MMM yyyy"
              weekStartsOn={1}
              showMonthAndYearPickers={false}
            />
          </Stack>
          <Stack alignItems="flex-start" spacing={1.5}>
            <Stack direction="row">
              <Flight
                style={{
                  transform: "rotate(-90deg)",
                  color: SurfieGreen,
                }}
              />
              <>
                Select return date{" "}
                <div style={{ color: "grey", paddingLeft: "5px" }}>
                  (optional)
                </div>
              </>
            </Stack>
            <Divider flexItem style={{ backgroundColor: "black" }} />
            <Calendar
              onChange={(item) => setReturnDate(item)}
              date={returnDate}
              minDate={departureDate ? new Date(departureDate) : new Date()}
              disabledDates={disabledArrivalDates}
              dateDisplayFormat="d MMM yyyy"
              weekStartsOn={1}
              showMonthAndYearPickers={false}
            />
          </Stack>
        </Stack>
        <Stack direction="row">
          <Button onClick={handleCalendarClose}>OK</Button>
          <Button onClick={handleClearDates}>Clear</Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default DateSelection;
