import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const PassengersTable = ({ passengers, origin, destination, returnTicket }) => {
  return (
    <TableContainer component={Paper}>
      <Table bgcolor="#F4F4F4">
        <TableHead>
          <TableRow>
            <TableCell>Passengers</TableCell>
            <TableCell>
              <Grid textAlign="center">
                <FlightTakeoffIcon />
                <Typography>
                  {origin} - {destination}
                </Typography>
              </Grid>
            </TableCell>
            {returnTicket ? (
              <TableCell>
                <Grid textAlign="center">
                  <FlightTakeoffIcon style={{ transform: "scaleX(-1)" }} />
                  <Typography>
                    {destination} - {origin}
                  </Typography>
                </Grid>
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers.map((passenger) => (
            <TableRow key={passenger.passportId}>
              <TableCell>
                <Grid container direction={"row"} alignItems={"center"}>
                  <Avatar sx={{ marginRight: "10px" }}>
                    {passenger.firstName.slice(0, 1)}
                  </Avatar>
                  {passenger.firstName} {passenger.lastName}
                </Grid>
              </TableCell>
              <TableCell align="center">Please select seat number</TableCell>
              {returnTicket ? (
                <TableCell align="center">Please select seat number</TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengersTable;
