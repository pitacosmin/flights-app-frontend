import React, { useEffect, useState } from "react";
import { getFlightsByOriginDestinationDate } from "../../api/apiClient";
import { Grid } from "@mui/material";
import DetailsHeader from "./DetailsHeader";
import "./SelectFlight.css";
import { SelectFlightBody } from "./SelectFlightBody.style";
import HorizontalStepper from "./Stepper";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFlight } from "../../redux/features/flightSlice";

const SelectFlight = () => {
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState(null);
  const [isReturn, setIsReturn] = useState(false);
  const [selectedDepartureTicket, setSelectedDepartureTicket] = useState(null);
  const [selectedReturnTicket, setSelectedReturnTicket] = useState(null);
  const [departurePrice, setDeparturePrice] = useState(null);
  const [returnPrice, setReturnPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const [searchParams] = useSearchParams();
  const {
    adults,
    teens,
    children,
    infants,
    origin,
    destination,
    departureDate,
    returnDate,
  } = Object.fromEntries(searchParams.entries());

  const passengers = {
    adult: adults,
    teen: teens,
    child: children,
    infant: infants,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setFlight({
        origin: origin,
        destination: destination,
        departureDate: departureDate,
        returnDate: returnDate,
        passengerCounts: passengers,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      setFlight({
        departureTicket: selectedDepartureTicket,
        returnTicket: selectedReturnTicket,
        departurePrice: departurePrice,
        returnPrice: returnPrice,
        totalPrice: totalPrice,
      })
    );
  }, [selectedDepartureTicket, selectedReturnTicket, totalPrice]);

  useEffect(() => {
    const numOfPassengers =
      parseInt(adults) + parseInt(teens) + parseInt(children);

    const price =
      numOfPassengers * departurePrice + numOfPassengers * returnPrice;

    setTotalPrice(Number(price.toFixed(2)));
  }, [departurePrice, returnPrice]);

  const originCity = departureFlights.find(
    (flight) => flight.route.originAirport.city.cityName
  )?.route.originAirport.city.cityName;

  const destinationCity = departureFlights.find(
    (flight) => flight.route.destinationAirport.city.cityName
  )?.route.destinationAirport.city.cityName;

  useEffect(() => {
    const fetchFlights = async () => {
      const departureFlightsData = await getFlightsByOriginDestinationDate(
        origin,
        destination,
        departureDate
      );
      setDepartureFlights(departureFlightsData);
      if (returnDate) {
        const returnFlightsData = await getFlightsByOriginDestinationDate(
          destination,
          origin,
          returnDate
        );
        setReturnFlights(returnFlightsData);
        setIsReturn(true);
      }
    };

    fetchFlights();
  }, [departureDate, destination, origin, returnDate]);

  return (
    <SelectFlightBody container flex={1} alignContent="flex-start">
      <DetailsHeader
        originCity={originCity}
        destinationCity={destinationCity}
      ></DetailsHeader>
      <Grid item xs={12} className="content__container">
        <HorizontalStepper
          departureFlights={departureFlights}
          destinationCity={destinationCity}
          isReturn={isReturn}
          originCity={originCity}
          returnFlights={returnFlights}
          selectedDepartureTicket={selectedDepartureTicket}
          selectedReturnTicket={selectedReturnTicket}
          setSelectedDepartureTicket={setSelectedDepartureTicket}
          setSelectedReturnTicket={setSelectedReturnTicket}
          passengers={passengers}
          setDeparturePrice={setDeparturePrice}
          setReturnPrice={setReturnPrice}
          departurePrice={departurePrice}
          returnPrice={returnPrice}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        ></HorizontalStepper>
      </Grid>
    </SelectFlightBody>
  );
};

export default SelectFlight;
