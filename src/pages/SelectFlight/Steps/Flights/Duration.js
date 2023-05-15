import React from "react";
import { styled, Grid, Divider, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { formatTimeDifference } from "../../../../utils/formatDates";

const ColumnGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
`;

const Duration = ({ departureTime, arrivalTime, isReturn }) => {
  return (
    <ColumnGrid item xs={8}>
      <Grid item xs={12}>
        <Divider flexItem>
          <FlightIcon
            style={{ transform: isReturn ? "rotate(-90deg)" : "rotate(90deg)" }}
          />
        </Divider>
        <Typography>
          {formatTimeDifference(departureTime, arrivalTime)}
        </Typography>
      </Grid>
    </ColumnGrid>
  );
};

export default Duration;
