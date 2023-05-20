import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PassengersTable = ({ passengers, origin, destination, isReturn }) => {
  return (
    <TableContainer component={Box} color={"lightgrey"}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Route</TableCell>
            <TableCell>Cabin Baggage</TableCell>
            <TableCell align="center">Seat Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers?.map((passenger, index) => (
            <TableRow key={index}>
              <TableCell>{passenger.title}</TableCell>
              <TableCell>{passenger.firstName}</TableCell>
              <TableCell>{passenger.lastName}</TableCell>
              <TableCell>
                {origin} - {destination}
              </TableCell>
              <TableCell>1/40cm x 20cm x 25cm</TableCell>
              <TableCell align="center">
                {!isReturn
                  ? passenger.departureSeatNumber
                  : passenger.returnSeatNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengersTable;
