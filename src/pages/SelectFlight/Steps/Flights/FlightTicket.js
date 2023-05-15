import { Grid, Typography, Paper, styled, Divider } from "@mui/material";
import TimeGrid from "./TimeGrid";
import Duration from "./Duration";
import Dates from "./Dates";
import Price from "./Price";
import { useState } from "react";

const InfoGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
`;

const FlightNumberGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px 0px 5px 20px;
`;

const DashedDivider = styled(Divider)`
  border-style: dashed;
  border-width: 1px;
  border-color: black;
`;

const FlightTicket = ({
  flights,
  isReturn,
  setSelectedTicket,
  selectedTicket,
  setPrice,
}) => {
  const [isSelectedTicket, setIsSelectedTicket] = useState(false);
  const handleSelectTicket = (id) => {
    if (id) {
      setIsSelectedTicket(true);
      setSelectedTicket(id);
    } else {
      setIsSelectedTicket(false);
      setSelectedTicket(null);
    }
  };

  return (
    <Grid container spacing={2}>
      {flights
        .filter(
          (flight) => !isSelectedTicket || flight.flightId === selectedTicket
        )
        .map((flight) => (
          <Grid container direction="row" item xs={12} key={flight.flightId}>
            <Grid item xs={9}>
              <Paper style={{ borderRadius: "8px" }}>
                <InfoGrid>
                  <Grid container direction="column" item xs={10}>
                    <Dates
                      departureDate={flight.departureDate}
                      arrivalDate={flight.arrivalDate}
                    ></Dates>
                    <Grid container direction="row" item xs={8}>
                      <TimeGrid
                        time={flight.route.departureTime}
                        cityName={flight.route.originAirport.city.cityName}
                      ></TimeGrid>
                      <Duration
                        isReturn={isReturn}
                        departureTime={flight.route.departureTime}
                        arrivalTime={flight.route.arrivalTime}
                      ></Duration>
                      <TimeGrid
                        time={flight.route.arrivalTime}
                        cityName={flight.route.destinationAirport.city.cityName}
                      ></TimeGrid>
                    </Grid>
                  </Grid>
                  <FlightNumberGrid container item xs={2}>
                    <Grid item xs={12}>
                      <Typography>Flight no.</Typography>
                      <Typography>{flight.route.flightNumber}</Typography>
                    </Grid>
                  </FlightNumberGrid>
                </InfoGrid>
              </Paper>
            </Grid>
            <DashedDivider
              flexItem
              orientation="vertical"
              variant="middle"
            ></DashedDivider>
            <Grid item xs={2.9}>
              <Price
                setPrice={setPrice}
                handleSelectTicket={handleSelectTicket}
                flight={flight}
              ></Price>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default FlightTicket;
