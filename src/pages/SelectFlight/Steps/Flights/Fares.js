import { Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";
import FareCard from "./FareCard";

const InfoGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  padding: 20px 30px;
`;

const Fares = ({ goToPassengers, totalPrice, setTotalPrice }) => {
  const plans = [
    {
      name: "Basic",
      description: "Travel light",
      color: "grey",
      benefitPrice: totalPrice,
    },
    {
      name: "Regular",
      description: "Short trips",
      color: "#19456b",
      benefitPrice: totalPrice * 1.2,
    },
    {
      name: "Premium",
      description: "Full comfort",
      color: "#F7D31D",
      benefitPrice: totalPrice * 1.5,
    },
  ];
  return (
    <Grid item xs={12} style={{ padding: "50px 0px" }}>
      <Paper style={{ backgroundColor: "#F8F8F9" }}>
        <Typography style={{ padding: "20px 30px 0px 30px" }}>
          Select one of the fares for your trip
        </Typography>
        <InfoGrid container item xs={12} spacing={2}>
          {plans.map((plan) => (
            <FareCard
              key={plan.name}
              headerPlan={plan.name}
              headerTitle={plan.description}
              planColor={plan.color}
              goToPassengers={goToPassengers}
              totalPrice={plan.benefitPrice}
              setTotalPrice={setTotalPrice}
            ></FareCard>
          ))}
        </InfoGrid>
      </Paper>
    </Grid>
  );
};

export default Fares;
