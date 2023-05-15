import React, { useEffect, useState } from "react";
import { Button, Grid, styled, Typography, Paper } from "@mui/material";
import { getBasePriceByFlightId } from "../../../../api/apiClient";

const PaperPriceGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

const Price = ({ flight, handleSelectTicket, setPrice }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      const priceResponse = await getBasePriceByFlightId(flight.flightId);
      setBasePrice(priceResponse);
    };
    fetchPrice();
  }, []);

  const handleOnSelect = () => {
    setPrice(basePrice);
    handleSelectTicket(flight.flightId);
    setIsSelected(true);
  };
  const handleChooseDifferentFlight = () => {
    handleSelectTicket(null);
    setIsSelected(false);
  };

  return (
    <Paper style={{ borderRadius: "8px" }}>
      {!isSelected ? (
        <PaperPriceGrid container>
          <Grid item xs={12}>
            <Typography>Value fare</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>€{basePrice}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleOnSelect} style={{ padding: 0 }}>
              SELECT
            </Button>
          </Grid>
        </PaperPriceGrid>
      ) : (
        <PaperPriceGrid container>
          <Grid item xs={8}>
            <Typography> SELECTED</Typography>
          </Grid>
          <Grid item xs={8}>
            <Button
              onClick={handleChooseDifferentFlight}
              style={{ padding: 0 }}
            >
              Choose different flight
            </Button>
          </Grid>
        </PaperPriceGrid>
      )}
    </Paper>
  );
};

export default Price;
