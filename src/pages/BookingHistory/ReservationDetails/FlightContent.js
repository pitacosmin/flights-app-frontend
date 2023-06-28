import { Box, Grid, Typography } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { customToLocaleDateString } from "../../../utils/formatDates";
import PassengerContent from "./PassengerContent";
import ArrowRight from "../../../assets/arrow-right.png";

const FlightContent = ({ reservation, isReturn }) => {
  const originAirport = isReturn
    ? reservation.returnFlight.route.originAirport.city.cityName.toUpperCase()
    : reservation.departureFlight.route.originAirport.city.cityName.toUpperCase();

  const destinationAirport = isReturn
    ? reservation.returnFlight.route.destinationAirport.city.cityName.toUpperCase()
    : reservation.departureFlight.route.destinationAirport.city.cityName.toUpperCase();

  const departureDate = isReturn
    ? reservation.returnFlight.departureDate
    : reservation.departureFlight.departureDate;

  const departureTime = isReturn
    ? reservation.returnFlight.route.departureTime.substring(0, 5)
    : reservation.departureFlight.route.departureTime.substring(0, 5);

  const arrivalTime = isReturn
    ? reservation.returnFlight.route.arrivalTime.substring(0, 5)
    : reservation.departureFlight.route.arrivalTime.substring(0, 5);

  const destinationAirportIataCode = isReturn
    ? reservation.returnFlight.route.destinationAirport.airportIataCode
    : reservation.departureFlight.route.destinationAirport.airportIataCode;

  const originAirportIataCode = isReturn
    ? reservation.returnFlight.route.originAirport.airportIataCode
    : reservation.departureFlight.route.originAirport.airportIataCode;

  const flightNumber = isReturn
    ? reservation.returnFlight.route.flightNumber
    : reservation.departureFlight.route.flightNumber;
  return (
    <Grid container direction={"row"}>
      <Grid item container direction={"column"} spacing={1}>
        {/* TITLE */}
        <Grid
          item
          container
          direction={"row"}
          justifyContent={"center"}
          marginTop={"10px"}
        >
          <Grid item>
            <AirplanemodeActiveIcon
              style={{
                transform: isReturn ? "rotate(-90deg)" : "rotate(90deg)",
                marginRight: "20px",
                color: "#19159a",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"#19159a"}>
              {originAirport} - {destinationAirport}
            </Typography>
          </Grid>
        </Grid>

        {/* CONTENT */}
        <Grid
          item
          container
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"20px"}
          margin={0}
        >
          <Grid item xs={3}>
            <Box
              borderRadius="3px"
              border={"solid 1px lightgrey"}
              display={"flex"}
              flexDirection={"column"}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Grid
                item
                style={{ backgroundColor: "#f1eff2", padding: "20px 5px" }}
              >
                <Typography fontWeight={"bold"} color="#19159a" variant="body1">
                  {customToLocaleDateString(new Date(departureDate))}
                </Typography>
              </Grid>
              <Grid item style={{ backgroundColor: "white", padding: "5px" }}>
                <Typography variant="caption">
                  {new Date(departureDate).toLocaleString("en-US", {
                    weekday: "long",
                  })}
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Grid
                item
                container
                direction={"column"}
                alignItems={"flex-sart"}
                xs={3}
              >
                <Typography variant="body1" color="#19159a">
                  {departureTime}
                </Typography>
                <Typography variant="caption" color="grey" fontWeight="bold">
                  {originAirportIataCode}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction={"column"}
                alignItems={"center"}
                xs={3}
              >
                <img
                  src={ArrowRight}
                  alt="arrow"
                  style={{
                    maxHeight: "40px",
                    maxWidth: "40px",
                  }}
                />
                <Typography variant="caption" color="grey" fontWeight="bold">
                  {flightNumber}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction={"column"}
                alignItems={"flex-end"}
                xs={3}
              >
                <Typography variant="body1" color="#19159a">
                  {arrivalTime}
                </Typography>
                <Typography variant="caption" color="grey" fontWeight="bold">
                  {destinationAirportIataCode}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* PASSENGERS */}
        <Grid item>
          {reservation.passengers.map((passenger) => (
            <PassengerContent
              key={passenger.passengerId}
              passenger={passenger}
              isReturn={isReturn}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FlightContent;
