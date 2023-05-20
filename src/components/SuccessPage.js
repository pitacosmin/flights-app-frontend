import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { createReservation, getMetadataFromStripe } from "../api/apiClient";
import PassengersTable from "./PassengersTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { LightLateGrey } from "../assets/colors";

function SuccessPage() {
  const [metadata, setMetadata] = useState(null);
  const [reservationCreated, setReservationCreated] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");

  const [searchParams] = useSearchParams();
  const { sessionId } = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const fetchMetada = async () => {
      const data = await getMetadataFromStripe(sessionId);
      setMetadata(data);
    };

    fetchMetada();
  }, []);

  useEffect(() => {
    if (metadata && !reservationCreated) {
      const price = (parseFloat(metadata.price) / 100).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setTotalPrice(price);
      const postData = async () => {
        const data = await createReservation(
          metadata.email,
          price,
          metadata.flights,
          metadata.passengers
        );
        console.log(data);
        setReservationData(data);
        setReservationCreated(true);
      };
      console.log("metadata", metadata);
      postData();
    }
  }, [metadata]);

  return (
    <Paper sx={{ padding: "20px", margin: "auto", backgroundColor: "#fdfdfd" }}>
      <Grid container alignItems="center" justifyContent="center">
        <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 60 }} />
      </Grid>
      {metadata?.paymentStatus === "paid" ? (
        <Box>
          <Typography variant="h5" align="center" color="grey" padding={"20px"}>
            Congratulations!
          </Typography>
          <Typography variant="body1" align="center">
            Your booking has been confirmed. Your payment of amount{" "}
            <span style={{ color: LightLateGrey, fontWeight: "bold" }}>
              {totalPrice}€{" "}
            </span>
            was successful, and your booking reference number is{" "}
            <span style={{ color: LightLateGrey, fontWeight: "bold" }}>
              {reservationData?.reservationId.toString().padStart(5, "0")}.
            </span>
            <br />
            Beloware the details of your flight:
          </Typography>
        </Box>
      ) : (
        "Payment unsuccesfull"
      )}
      <Box sx={{ padding: "10px 20px" }}>
        <Typography variant="h6" color={LightLateGrey}>
          Departure flight
        </Typography>
        <PassengersTable
          passengers={metadata?.passengers}
          origin={metadata?.flights.origin}
          destination={metadata?.flights.destination}
        ></PassengersTable>
      </Box>
      <Box sx={{ padding: "10px 20px" }}>
        <Typography variant="h6" color={LightLateGrey}>
          Return flight
        </Typography>
        <PassengersTable
          passengers={metadata?.passengers}
          isReturn={true}
          origin={metadata?.flights.destination}
          destination={metadata?.flights.origin}
        ></PassengersTable>
      </Box>
    </Paper>
  );
}

export default SuccessPage;
