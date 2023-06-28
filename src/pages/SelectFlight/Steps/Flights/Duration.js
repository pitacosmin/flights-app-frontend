import React from "react";
import { styled, Grid, Divider, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import Plane from "../../../../assets/plane.png";
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
          {/* <FlightIcon
            style={{ transform: isReturn ? "rotate(-90deg)" : "rotate(90deg)" }}
          /> */}
          <img
            src={Plane}
            alt="plane-icon"
            style={{
              transform: isReturn ? "scaleX(-1)" : "rotate(0deg)",
              maxHeight: "40px",
              maxWidth: "40px",
            }}
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
