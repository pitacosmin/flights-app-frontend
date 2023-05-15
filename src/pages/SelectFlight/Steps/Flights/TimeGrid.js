import React from "react";
import { styled, Grid, Typography } from "@mui/material";
import { formatTime } from "../../../../utils/formatDates";

const ColumnGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

function TimeGrid({ time, cityName }) {
  return (
    <ColumnGrid item xs={2}>
      <Grid item xs={12}>
        <Typography>{formatTime(time)}</Typography>
        <Typography>{cityName}</Typography>
      </Grid>
    </ColumnGrid>
  );
}

export default TimeGrid;
