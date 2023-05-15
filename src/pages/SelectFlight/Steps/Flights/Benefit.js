import { Grid, Typography, styled } from "@mui/material";
import React from "react";

const BenefitGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Benefit = ({ text, descriptions, icon }) => {
  return (
    <BenefitGrid item container>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={10} container direction="column">
        <Typography variant="body2">{text}</Typography>
        {descriptions.map((description) => (
          <Typography key={description} variant="caption">
            {description}
          </Typography>
        ))}
      </Grid>
    </BenefitGrid>
  );
};

export default Benefit;
