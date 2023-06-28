import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import OneBooking from "./OneBooking";
import { getReservationsByUser } from "../../api/protectedApiClient";

const BookingHistory = () => {
  const [reservations, setReservations] = useState();

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsData = await getReservationsByUser();
      setReservations(reservationsData);
    };
    fetchReservations();
  }, []);

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  return (
    <Box padding={10}>
      <Box marginBottom={2}>
        <Typography variant="h4">This is your booking history</Typography>
      </Box>
      <Grid container direction={"column"}>
        {reservations?.map((reservation, index) => (
          <OneBooking key={index} reservation={reservation} />
        ))}
      </Grid>
    </Box>
  );
};

export default BookingHistory;
