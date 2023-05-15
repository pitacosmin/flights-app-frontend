import { Box, Button, Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckOut } from "../../../../api/apiClient";
import { ElmGreen } from "../../../../assets/colors";
import { STRIPE_KEY } from "../../../../data/constants";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/userSlice";
import { selectFlight } from "../../../../redux/features/flightSlice";

const stripePromise = loadStripe(STRIPE_KEY);

const Payment = ({ goBack, passengers, totalPrice }) => {
  const user = useSelector(selectUser);
  const flights = useSelector(selectFlight);

  console.log(passengers);
  console.log(user?.email);
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
      <Typography>Review tickets data</Typography>
      <Button
        onClick={goBack}
        size="large"
        variant="contained"
        sx={{ backgroundColor: ElmGreen }}
      >
        Go back
      </Button>
      <Button onClick={handlePayClick}>Submit</Button>
    </Box>
  );
};

export default Payment;
