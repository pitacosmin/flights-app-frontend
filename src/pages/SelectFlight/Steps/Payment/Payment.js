import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckOut, getFlightById } from "../../../../api/apiClient";
import { ElmGreen } from "../../../../assets/colors";
import { STRIPE_KEY } from "../../../../data/constants";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/userSlice";
import { selectFlight } from "../../../../redux/features/flightSlice";
import ArticleIcon from "@mui/icons-material/Article";
import { useEffect, useState } from "react";
import { customToLocaleDateString } from "../../../../utils/formatDates";
import PassengersFares from "./PassengersFares";
import { ExpandMore } from "@mui/icons-material";
import PassengersTable from "../../../../components/PassengersTable";
import PaymentIcon from "@mui/icons-material/Payment";
import GoBackButton from "../../../../components/GoBackButton";

const stripePromise = loadStripe(STRIPE_KEY);

const Payment = ({ goBack, passengers, totalPrice }) => {
  const user = useSelector(selectUser);
  const flights = useSelector(selectFlight);
  console.log("flight", flights);

  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchDepartureFlight = async () => {
      const data = await getFlightById(flights.departureTicket);
      setDepartureFlight(data);
    };

    const fetchReturnFlight = async () => {
      const data = await getFlightById(flights.returnTicket);
      setReturnFlight(data);
    };

    fetchDepartureFlight();
    fetchReturnFlight();
  }, []);

  useEffect(() => {
    console.log("departure", departureFlight);
    console.log("return", returnFlight);
  }, [departureFlight, returnFlight]);

  useEffect(() => {
    const dateForDeparture = new Date(departureFlight?.departureDate);
    setDepartureDate(customToLocaleDateString(dateForDeparture));

    const dateForReturn = new Date(returnFlight?.departureDate);
    setReturnDate(customToLocaleDateString(dateForReturn));
    console.log(departureDate);
    console.log(returnDate);
  }, [departureFlight?.departureDate, returnFlight?.departureDate]);

  console.log(passengers);
  const handlePayClick = async () => {
    const stripe = await stripePromise;
    const stripeSessionId = await createStripeCheckOut(
      totalPrice * 100,
      user?.email,
      passengers,
      flights
    );
    document.cookie = `stripeSessionId=${stripeSessionId}`;
    const result = await stripe.redirectToCheckout({
      sessionId: stripeSessionId,
    });

    console.log(result);
    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <Box>
      <Box>
        <Paper sx={{ margin: "20px 0px", padding: "20px 30px" }}>
          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                direction={"row"}
                padding={"10px"}
                alignItems={"center"}
              >
                <ArticleIcon color="primary" fontSize="large" />
                <Typography
                  variant="h6"
                  color={"Highlight"}
                  fontWeight={"bold"}
                >
                  Price Breakdown
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem color="black"></Divider>
            </Grid>
            <PassengersFares
              flight={departureFlight}
              date={departureDate}
              flights={flights}
              price={flights?.departurePrice}
            ></PassengersFares>
            <Grid item xs={12} padding={"0px 14px"}>
              <Accordion style={{ boxShadow: "none", borderRadius: "0" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ color: "#1976d2" }} />}
                  style={{ alignItems: "center" }}
                >
                  <Typography variant="body2" color="#1976d2">
                    Passengers
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PassengersTable
                    passengers={passengers}
                    origin={flights.origin}
                    destination={flights.destination}
                  ></PassengersTable>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem color="black"></Divider>
            </Grid>
            <PassengersFares
              flight={returnFlight}
              date={returnDate}
              flights={flights}
              price={flights?.returnPrice}
            ></PassengersFares>
            <Grid item xs={12}>
              <Accordion style={{ boxShadow: "none", borderRadius: "0" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ color: "#1976d2" }} />}
                  id="passengers-info-header"
                >
                  <Typography variant="body2" color="#1976d2">
                    Passengers
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PassengersTable
                    passengers={passengers}
                    isReturn={true}
                    origin={flights.destination}
                    destination={flights.origin}
                  ></PassengersTable>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Paper
                style={{ backgroundColor: "lightgray", padding: "10px 20px" }}
              >
                <Grid
                  container
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <Typography>Total to pay </Typography>
                  </Grid>
                  <Grid item>
                    <Typography> €{flights?.totalPrice}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item>
          <GoBackButton goBack={goBack} />
        </Grid>
        <Grid item>
          <Button
            onClick={handlePayClick}
            size="large"
            variant="contained"
            startIcon={<PaymentIcon />}
            sx={{ backgroundColor: ElmGreen }}
          >
            Proceed to payment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
