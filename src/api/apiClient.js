import axios from "axios";
import { SERVER } from "../data/constants";

const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  .split("=")[1];
console.log("access token", accessToken);

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

const refresh = async () => {
  const response = await axios.get(`${SERVER}/api/auth/token/refresh`, {
    withCredentials: true,
  });
  const prevAccessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    .split("=")[1];
  console.log("PREVIOUS token", prevAccessToken);
  console.log("NEW token", response.data.accessToken);
  document.cookie = `accessToken=${response.data.accessToken}`;
  return response.data.accessToken;
};

// const setupRequestInterceptors = (accessToken) => {
//   return axiosPrivate.interceptors.request.use(
//     (config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
// };

// const setupResponseInterceptors = (refresh) => {
//   return axiosPrivate.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const prevRequest = error?.config;
//       if (error?.response?.status === 403 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosPrivate(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// const getAccessToken = () => {
//   const accessTokenCookie = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("accessToken="));

//   if (accessTokenCookie) {
//     return accessTokenCookie.split("=")[1];
//   }

//   return null;
// };

// const getSeatsByFlightId = async (flightId) => {
//   const accessToken = getAccessToken();
//   const requestInterceptor = setupRequestInterceptors(accessToken);
//   const responseInterceptor = setupResponseInterceptors(refresh);

//   try {
//     const response = await axiosPrivate.get(
//       `${SERVER}/seats/flight/${flightId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     // Clean up the interceptors
//     axiosPrivate.interceptors.request.eject(requestInterceptor);
//     axiosPrivate.interceptors.response.eject(responseInterceptor);
//   }
// };

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

// const generateRandomSeatsByNumOfPassengers = async (
//   flightId,
//   numOfPassengers
// ) => {
//   const accessToken = getAccessToken();
//   const requestInterceptor = setupRequestInterceptors(accessToken);
//   const responseInterceptor = setupResponseInterceptors(refresh);

//   try {
//     const response = await axiosPrivate.get(
//       `${SERVER}/seats/${flightId}/generate/${numOfPassengers}/seats`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     // Clean up the interceptors
//     axiosPrivate.interceptors.request.eject(requestInterceptor);
//     axiosPrivate.interceptors.response.eject(responseInterceptor);
//   }
// };

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

// const createReservation = async (email, price, flights, passengers) => {
//   const accessToken = getAccessToken();
//   const requestInterceptor = setupRequestInterceptors(accessToken);
//   const responseInterceptor = setupResponseInterceptors(refresh);

//   try {
//     const response = await axiosPrivate.post(
//       `${SERVER}/reservation/create`,
//       {
//         price: price,
//         email: email,
//         passengers: passengers,
//         flights: flights,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   } finally {
//     // Clean up the interceptors
//     axiosPrivate.interceptors.request.eject(requestInterceptor);
//     axiosPrivate.interceptors.response.eject(responseInterceptor);
//   }
// };

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

// const getReservationsByUser = async () => {
//   const accessToken = getAccessToken();
//   const requestInterceptor = setupRequestInterceptors(accessToken);
//   const responseInterceptor = setupResponseInterceptors(refresh);

//   try {
//     const response = await axiosPrivate.get(`${SERVER}/reservation/history`, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   } finally {
//     // Clean up the interceptors
//     axiosPrivate.interceptors.request.eject(requestInterceptor);
//     axiosPrivate.interceptors.response.eject(responseInterceptor);
//   }
// };

export {
  getOrigins,
  getDestinationsByOrigin,
  getDepartureDates,
  getFlightsByOriginDestinationDate,
  authenticate,
  register,
  getUserByEmail,
  // getSeatsByFlightId,
  getAirplaneLayoutbyFlightId,
  getAirplaneCapacitybyFlightId,
  // generateRandomSeatsByNumOfPassengers,
  createStripeCheckOut,
  getBasePriceByFlightId,
  getMetadataFromStripe,
  // createReservation,
  getFlightById,
  // getReservationsByUser,
};
