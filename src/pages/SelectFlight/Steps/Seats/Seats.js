import { Box, Grid, Paper } from "@mui/material";
import TitleHeader from "./TitleHeader";
import BottomButtons from "./BottomButtons";
import { useEffect, useState } from "react";
import {
  generateRandomSeatsByNumOfPassengers,
  getAirplaneCapacitybyFlightId,
  getAirplaneLayoutbyFlightId,
  getSeatsByFlightId,
} from "../../../../api/apiClient";
import SeatMap from "./SeatMap";
import PassangersSeatSelector from "./PassangersSeatSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeatNumbers,
  selectPassengers,
  setPassengers,
} from "../../../../redux/features/passengerSlice";

const Seats = ({
  passengers,
  setPassengers,
  departureTicket,
  returnTicket,
  originCity,
  destinationCity,
  goBack,
  goToPayment,
}) => {
  const dispatch = useDispatch();
  const [departureSeats, setDepartureSeats] = useState([]);
  const [returnSeats, setReturnSeats] = useState([]);
  const [layout, setLayout] = useState([]);
  const [capacity, setCapacity] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const departureSeatsData = await getSeatsByFlightId(departureTicket);
      setDepartureSeats(departureSeatsData);

      if (returnTicket) {
        const returnSeatsData = await getSeatsByFlightId(returnTicket);
        setReturnSeats(returnSeatsData);
      }
    };

    const fetchAirplaneInfo = async () => {
      const layoutData = await getAirplaneLayoutbyFlightId(departureTicket);
      setLayout(layoutData);

      const capacityData = await getAirplaneCapacitybyFlightId(departureTicket);
      setCapacity(capacityData);
    };

    fetchSeats();
    fetchAirplaneInfo();
  }, []);

  const handleButtonClick = () => {
    goToPayment();
  };

  const fetchRandomSeats = async (ticket) => {
    const numOfPassengers = passengers.length;
    const randomSeats = await generateRandomSeatsByNumOfPassengers(
      ticket,
      numOfPassengers
    );

    return randomSeats;
  };

  const assignRandomSeatsToPassengeers = (departureSeats, returnSeats) => {
    const updatedPassengers = passengers.map((passenger, index) => {
      return {
        ...passenger,
        departureSeatNumber: departureSeats[index],
        returnSeatNumber: returnSeats ? returnSeats[index] : null,
      };
    });
    setPassengers(updatedPassengers);
  };

  const handleRandomSeatsPicker = async () => {
    const departureRandomSeats = await fetchRandomSeats(departureTicket);
    const returnRandomSeats = returnTicket
      ? await fetchRandomSeats(returnTicket)
      : null;

    assignRandomSeatsToPassengeers(departureRandomSeats, returnRandomSeats);
    console.log("departure seats", departureRandomSeats);
    console.log("return seats", returnRandomSeats);
    dispatch(
      addSeatNumbers({
        departureSeats: departureRandomSeats,
        returnSeats: returnRandomSeats,
      })
    );
    goToPayment();
  };

  return (
    <Box>
      <Grid item xs={12}>
        <TitleHeader />
        <Box>
          <Paper>
            <Grid container direction="row">
              <SeatMap
                layout={layout}
                capacity={capacity}
                departureSeats={departureSeats}
                returnSeats={returnSeats}
                passengers={passengers}
              ></SeatMap>
              <PassangersSeatSelector
                originCity={originCity}
                destinationCity={destinationCity}
                returnTicket={returnTicket}
                passengers={passengers}
                handleRandomSeatsPicker={handleRandomSeatsPicker}
              ></PassangersSeatSelector>
            </Grid>
          </Paper>
        </Box>
        <BottomButtons
          goBack={goBack}
          handleButtonClick={handleButtonClick}
        ></BottomButtons>
      </Grid>
    </Box>
  );
};

export default Seats;
