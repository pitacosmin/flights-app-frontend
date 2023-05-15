import { Grid, Stack, Alert, Button } from "@mui/material";
import PassengerTypePicker from "./PassengerTypePicker";

const PassengersSelection = ({
  handlePassengersClose,
  passengers,
  setPassengers,
}) => {
  return (
    <Grid item xs={4} className="passengers-grid">
      <Stack spacing={2}>
        <Alert severity="info">
          Choose passengers based on their age{" "}
          <strong>at the time of travel</strong>
        </Alert>
        {Object.entries(passengers).map(([ageGroup, count]) => (
          <PassengerTypePicker
            key={ageGroup}
            ageGroup={ageGroup}
            count={count}
            setPassengers={setPassengers}
          />
        ))}
        <Button onClick={handlePassengersClose}>OK</Button>
      </Stack>
    </Grid>
  );
};

export default PassengersSelection;
