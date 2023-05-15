import { Grid } from "@mui/material";
import TitleHeader from "./TitleHeader";
import FlightTicket from "./FlightTicket";

const FlightInfo = ({
  originCity,
  destinationCity,
  flights,
  isReturn,
  selectedTicket,
  setSelectedTicket,
  setPrice,
}) => {
  return flights ? (
    <Grid item xs={12}>
      <TitleHeader
        originCity={originCity}
        destinationCity={destinationCity}
      ></TitleHeader>
      <FlightTicket
        flights={flights}
        isReturn={isReturn}
        setSelectedTicket={setSelectedTicket}
        selectedTicket={selectedTicket}
        setPrice={setPrice}
      ></FlightTicket>
    </Grid>
  ) : null;
};

export default FlightInfo;
