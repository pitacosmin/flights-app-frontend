import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import OneBooking from "./OneBooking";
import { getReservationsByUser } from "../../api/protectedApiClient";
import { SurfieGreen } from "../../assets/colors";

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
        <Typography variant="h4" letterSpacing={"0.1rem"} color={SurfieGreen}>
          <b>Your booking history</b>
        </Typography>
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
