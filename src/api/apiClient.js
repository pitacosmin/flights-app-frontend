import axios from "axios";
import { SERVER } from "../data/constants";

const getOrigins = async () => {
  try {
    const response = await axios.get(`${SERVER}/airports/getOrigins`);
    const airports = response.data;

    return airports;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDestinationsByOrigin = async (originIataCode) => {
  try {
    const response = await axios.get(
      `${SERVER}/airports/get-destinations/${originIataCode}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const airports = response.data;

    return airports;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDepartureDates = async (originIataCode, destinationIataCode) => {
  try {
    const response = await axios.get(
      `${SERVER}/flights/${originIataCode}/${destinationIataCode}/departure-dates`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const dates = response.data;
    return dates;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getFlightsByOriginDestinationDate = async (
  originIataCode,
  destinationIataCode,
  departureDate
) => {
  try {
    const response = await axios.get(
      `${SERVER}/flights/${originIataCode}/${destinationIataCode}/${departureDate}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const flights = response.data;
    return flights;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${SERVER}/users/${email}`, {
      headers: { "Content-Type": "application/json" },
    });
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authenticate = async (email, password) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/auth/authenticate`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const register = async (email, password) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/auth/register`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSeatsByFlightId = async (flightId) => {
  try {
    const response = await axios.get(`${SERVER}/seats/flight/${flightId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAirplaneLayoutbyFlightId = async (flightId) => {
  try {
    const response = await axios.get(
      `${SERVER}/airplanes/layout/flight/${flightId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAirplaneCapacitybyFlightId = async (flightId) => {
  try {
    const response = await axios.get(
      `${SERVER}/airplanes/capacity/flight/${flightId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const generateRandomSeatsByNumOfPassengers = async (
  flightId,
  numOfPassengers
) => {
  try {
    const response = await axios.get(
      `${SERVER}/seats/${flightId}/generate/${numOfPassengers}/seats`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createStripeCheckOut = async (price, email, passengers, flights) => {
  try {
    const response = await axios.post(
      `${SERVER}/stripe/create-checkout-session`,
      {
        price: price,
        email: email,
        passengers: passengers,
        flights: flights,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBasePriceByFlightId = async (flightId) => {
  try {
    const response = await axios.get(`${SERVER}/flights/${flightId}/price`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMetadataFromStripe = async (sessionId) => {
  try {
    const response = await axios.get(`${SERVER}/stripe/metadata/${sessionId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return {
      ...response.data,
      flights: JSON.parse(response.data.flights),
      passengers: JSON.parse(response.data.passengers),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const createReservation = async (email, price, flights, passengers) => {
  try {
    const response = await axios.post(
      `${SERVER}/reservation/create`,
      {
        price: price,
        email: email,
        passengers: passengers,
        flights: flights,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getFlightById = async (id) => {
  try {
    const response = await axios.get(`${SERVER}/flights/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export {
  getOrigins,
  getDestinationsByOrigin,
  getDepartureDates,
  getFlightsByOriginDestinationDate,
  authenticate,
  register,
  getUserByEmail,
  getSeatsByFlightId,
  getAirplaneLayoutbyFlightId,
  getAirplaneCapacitybyFlightId,
  generateRandomSeatsByNumOfPassengers,
  createStripeCheckOut,
  getBasePriceByFlightId,
  getMetadataFromStripe,
  createReservation,
  getFlightById,
};
