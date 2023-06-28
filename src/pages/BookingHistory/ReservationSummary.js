import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function replaceAll(str, searchChar, replaceChar) {
  return str.split(searchChar).join(replaceChar);
}

const ReservationSummary = ({ reservation }) => {
  console.log(reservation);
  const isReturn =
    reservation.returnFlight !== null ? "Return flight" : "One way";
  const numOfPassengers = reservation.passengers.length;
  const date = new Date(reservation.registeredAt);
  const purchaseDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <Grid item container direction={"column"} justifyContent={"center"}>
      <Grid item>
        <Typography variant="body2" color={"grey"} padding={"10px 0px"}>
          You have purchased the ticket on {replaceAll(purchaseDate, "/", ".")}{" "}
          for the route:
        </Typography>
      </Grid>
      <Grid
        item
        spacing={2}
        container
        direction={"row"}
        alignItems={"baseline"}
      >
        <Grid item>
          <Typography variant="h6" color={"#2e57a1"} fontWeight={"bold"}>
            {reservation.departureFlight.route.originAirport.city.cityName} to{" "}
            {reservation.departureFlight.route.destinationAirport.city.cityName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color={"grey"}>
            {reservation.departureFlight.route.flightNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color={"grey"}>
              • {numOfPassengers}
            </Typography>
            <PersonIcon fontSize="small" sx={{ color: "grey" }} />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="body2" color={"grey"}>
            • {isReturn}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="caption" color={"grey"}>
          You can view all the details by clicking on the button on the right
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReservationSummary;
