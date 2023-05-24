import {
  Avatar,
  Box,
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

const PassengersTable = ({
  passengers,
  origin,
  destination,
  returnTicket,
  isReturnSelected,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table bgcolor="#FDFDFD">
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
              <TableCell
                style={{
                  backgroundColor: !isReturnSelected ? "#e2f4ff" : "#FDFDFD",
                }}
              >
                <Grid
                  container
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {passenger.departureSeatNumber ? (
                    <Box
                      color={"white"}
                      bgcolor={"#e67e22"}
                      sx={{
                        height: "50px",
                        width: "50px",
                        border: "2px dashed lightgrey",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {passenger.departureSeatNumber}
                    </Box>
                  ) : (
                    <Box
                      bgcolor={"white"}
                      sx={{
                        height: "50px",
                        width: "50px",
                        border: "2px dashed lightgrey",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                    ></Box>
                  )}
                </Grid>
              </TableCell>
              {returnTicket ? (
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: isReturnSelected ? "#e2f4ff" : "#FDFDFD",
                  }}
                >
                  <Grid
                    container
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    {passenger.returnSeatNumber ? (
                      <Box
                        color={"white"}
                        bgcolor={"#e67e22"}
                        sx={{
                          height: "50px",
                          width: "50px",
                          border: "2px dashed lightgrey",
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                        }}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {passenger.returnSeatNumber}
                      </Box>
                    ) : (
                      <Box
                        bgcolor={"white"}
                        sx={{
                          height: "50px",
                          width: "50px",
                          border: "2px dashed lightgrey",
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                        }}
                      ></Box>
                    )}
                  </Grid>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengersTable;
