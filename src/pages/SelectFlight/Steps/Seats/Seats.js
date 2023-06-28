import { Box, Grid, Paper } from "@mui/material";
import TitleHeader from "./TitleHeader";
import BottomButtons from "./BottomButtons";
import { useEffect, useState } from "react";
import {
  getAirplaneCapacitybyFlightId,
  getAirplaneLayoutbyFlightId,
} from "../../../../api/apiClient";
import PassangersSeatSelector from "./PassangersSeatSelector";
import { useDispatch } from "react-redux";
import { addSeatNumbers } from "../../../../redux/features/passengerSlice";
import DepartureSeatMap from "./DepartureSeatMap";
import ReturnSeatMap from "./ReturnSeatMap";
import {
  generateRandomSeatsByNumOfPassengers,
  getSeatsByFlightId,
} from "../../../../api/protectedApiClient";

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
  const [deparuteLayout, setDepartureLayout] = useState([]);
  const [departureCapacity, setDepartureCapacity] = useState([]);
  const [returnLayout, setReturnLayout] = useState([]);
  const [returnCapacity, setReturnCapacity] = useState([]);
  const [isReturnSelected, setIsReturnSelected] = useState(false);

  const [selectedDepartureSeats, setSelectedDepartureSeats] = useState([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const departureSeatsData = await getSeatsByFlightId(departureTicket);
      setDepartureSeats(departureSeatsData);

      if (returnTicket) {
        const returnSeatsData = await getSeatsByFlightId(returnTicket);
        setReturnSeats(returnSeatsData);
      }
    };

    const fetchDepartureAirplaneInfo = async () => {
      const layoutData = await getAirplaneLayoutbyFlightId(departureTicket);
      setDepartureLayout(layoutData);

      const capacityData = await getAirplaneCapacitybyFlightId(departureTicket);
      setDepartureCapacity(capacityData);
    };

    const fetchReturnAirplaneInfo = async () => {
      const layoutData = await getAirplaneLayoutbyFlightId(returnTicket);
      setReturnLayout(layoutData);

      const capacityData = await getAirplaneCapacitybyFlightId(returnTicket);
      setReturnCapacity(capacityData);
    };

    fetchSeats();
    fetchDepartureAirplaneInfo();
    fetchReturnAirplaneInfo();
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
        <TitleHeader handleRandomSeatsPicker={handleRandomSeatsPicker} />
        <Box>
          <Paper>
            <Grid container direction="row" padding={"50px 0px"}>
              {!isReturnSelected ? (
                <DepartureSeatMap
                  layout={deparuteLayout}
                  capacity={departureCapacity}
                  occupiedSeats={departureSeats}
                  passengers={passengers}
                  setPassengers={setPassengers}
                  selectedDepartureSeats={selectedDepartureSeats}
                  setSelectedDepartureSeats={setSelectedDepartureSeats}
                ></DepartureSeatMap>
              ) : (
                <ReturnSeatMap
                  layout={returnLayout}
                  capacity={returnCapacity}
                  occupiedSeats={returnSeats}
                  passengers={passengers}
                  setPassengers={setPassengers}
                  selectedReturnSeats={selectedReturnSeats}
                  setSelectedReturnSeats={setSelectedReturnSeats}
                ></ReturnSeatMap>
              )}
              <PassangersSeatSelector
                originCity={originCity}
                destinationCity={destinationCity}
                returnTicket={returnTicket}
                passengers={passengers}
                setIsReturnSelected={setIsReturnSelected}
                isReturnSelected={isReturnSelected}
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
