import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  getOrigins,
  getDestinationsByOrigin,
  getDepartureDates,
} from "../../api/apiClient";
import disableDates from "../../utils/disableDates";
import { dateToYMD } from "../../utils/formatDates";
import CustomAutocomplete from "./CustomAutocomplete";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PassengersSelection from "./PassengersSelection";
import DateSelection from "./DateSelection";
import PassengerButton from "./PassengerButton";
import SearchButton from "./SearchButton";
import CalendarButton from "./CalendarButton";
import { useDispatch } from "react-redux";
import { setFlight } from "../../redux/features/flightSlice";

const SearchFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedOriginIataCode, setSelectedOriginIataCode] = useState("");
  const [origins, setOrigins] = useState([]);
  const [originValue, setOriginValue] = useState(null);

  const [selectedDestinationIataCode, setSelectedDestinationIataCode] =
    useState("");
  const [destinations, setDestinations] = useState([]);
  const [destinationValue, setDestinationValue] = useState(null);

  const [returnDate, setReturnDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [departureDatesData, setDepartureDatesData] = useState([]);
  const [returnDatesData, setReturnDatesData] = useState([]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);

  const [passengers, setPassengers] = useState({
    adults: 1,
    teens: 0,
    children: 0,
    infants: 0,
  });

  const disabledArrivalDates = disableDates(returnDatesData);
  const disabledDepartureDates = disableDates(departureDatesData);

  useEffect(() => {
    const fetchOrigins = async () => {
      const airportsData = await getOrigins();
      setOrigins(airportsData);
    };
    fetchOrigins();
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (selectedOriginIataCode) {
        const airportsData = await getDestinationsByOrigin(
          selectedOriginIataCode
        );
        return setDestinations(airportsData);
      }

      setDestinationValue(null);
      setSelectedDestinationIataCode("");
      return setDestinations([]);
    };
    fetchDestinations();
  }, [selectedOriginIataCode]);

  useEffect(() => {
    const fetchCalendarDates = async () => {
      if (selectedOriginIataCode && selectedDestinationIataCode) {
        const departureDatesData = await getDepartureDates(
          selectedOriginIataCode,
          selectedDestinationIataCode
        );
        setDepartureDatesData(departureDatesData);
        const returnDatesData = await getDepartureDates(
          selectedDestinationIataCode,
          selectedOriginIataCode
        );
        setReturnDatesData(returnDatesData);
      }
    };
    fetchCalendarDates();
  }, [selectedOriginIataCode, selectedDestinationIataCode]);

  const handleOriginChange = (_event, value, reason) => {
    if (reason === "clear") {
      setSelectedDestinationIataCode("");
      setDestinationValue(null);
      setOriginValue(null);
      return setSelectedOriginIataCode("");
    }
    if (value) {
      setOriginValue(value);
      setDestinationValue(null);
      setSelectedDestinationIataCode("");
      return setSelectedOriginIataCode(value.airportIataCode);
    }

    setOriginValue(null);
    return setSelectedOriginIataCode("");
  };

  const handleDestinationChange = (_event, value) => {
    if (value) {
      setDestinationValue(value);
      return setSelectedDestinationIataCode(value.airportIataCode);
    }

    setDestinationValue(null);
    return setSelectedDestinationIataCode("");
  };

  const handleCalendarOpen = () => {
    setShowCalendar(true);
    setShowPassengers(false);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const handlePassengersOpen = () => {
    setShowPassengers(true);
    setShowCalendar(false);
  };

  const handlePassengersClose = () => {
    setShowPassengers(false);
  };

  const handleClearDates = () => {
    setReturnDate(null);
    setDepartureDate(null);
  };

  const handleSearch = () => {
    const dDate = dateToYMD(departureDate);
    const rDate = returnDate ? dateToYMD(returnDate) : "";

    dispatch(
      setFlight({
        origin: selectedOriginIataCode,
        destination: selectedDestinationIataCode,
        departureDate: dDate,
        returnDate: rDate,
        passengerCounts: passengers,
      })
    );

    navigate(
      `/select-flights?adults=${passengers.adults}&teens=${
        passengers.teens
      }&children=${passengers.children}&infants=${
        passengers.infants
      }&origin=${selectedOriginIataCode}&destination=${selectedDestinationIataCode}&departureDate=${dDate}${
        rDate ? `&returnDate=${rDate}` : ""
      }`
    );
  };

  return (
    <Grid container className="booking-container" alignItems={"stretch"}>
      <Grid item xs={4} id="form-grid">
        <form
          className="flight-booking-form"
          style={{
            borderRadius:
              showCalendar || showPassengers ? "5px 0 0 5px" : "5px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} id="autocomplete-inputs">
              <CustomAutocomplete
                value={originValue}
                options={origins}
                handleDataChange={handleOriginChange}
                labelText="Origin"
              />
              <CustomAutocomplete
                value={destinationValue}
                options={destinations}
                handleDataChange={handleDestinationChange}
                labelText="Destination"
              />
            </Grid>
            <CalendarButton
              departureDate={departureDate}
              handleCalendarOpen={handleCalendarOpen}
              returnDate={returnDate}
              showCalendar={showCalendar}
            ></CalendarButton>
            <PassengerButton
              handlePassengersOpen={handlePassengersOpen}
              passengers={passengers}
              showPassengers={showPassengers}
            ></PassengerButton>
            <SearchButton handleSearch={handleSearch}></SearchButton>
          </Grid>
        </form>
      </Grid>
      {showCalendar && (
        <DateSelection
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          disabledDepartureDates={disabledDepartureDates}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          disabledArrivalDates={disabledArrivalDates}
          handleCalendarClose={handleCalendarClose}
          handleClearDates={handleClearDates}
        ></DateSelection>
      )}
      {showPassengers && (
        <PassengersSelection
          handlePassengersClose={handlePassengersClose}
          passengers={passengers}
          setPassengers={setPassengers}
        ></PassengersSelection>
      )}
    </Grid>
  );
};

export default SearchFlight;
