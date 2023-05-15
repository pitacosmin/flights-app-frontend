import React from "react";
import { styled, Grid, Typography } from "@mui/material";
import { tolocaleDateStringUS } from "../../../../utils/formatDates";

const RowGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Dates = ({ departureDate, arrivalDate }) => {
  return (
    <RowGrid item xs={3}>
      <Typography>{tolocaleDateStringUS(departureDate)}</Typography>
      <Typography>{tolocaleDateStringUS(arrivalDate)}</Typography>
    </RowGrid>
  );
};

export default Dates;
