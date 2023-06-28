import {
  getAccessToken,
  setupRequestInterceptors,
  setupResponseInterceptors,
} from "./config";
import axios from "axios";
import { SERVER } from "../data/constants";

export const axiosPrivate = axios.create({
  baseURL: SERVER,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

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

const generateRandomSeatsByNumOfPassengers = async (
  flightId,
  numOfPassengers
) => {
  const accessToken = getAccessToken();
  const requestInterceptor = setupRequestInterceptors(accessToken);
  const responseInterceptor = setupResponseInterceptors(refresh);

  try {
    const response = await axiosPrivate.get(
      `${SERVER}/seats/${flightId}/generate/${numOfPassengers}/seats`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // Clean up the interceptors
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  }
};

const getSeatsByFlightId = async (flightId) => {
  const accessToken = getAccessToken();
  const requestInterceptor = setupRequestInterceptors(accessToken);
  const responseInterceptor = setupResponseInterceptors(refresh);

  try {
    const response = await axiosPrivate.get(
      `${SERVER}/seats/flight/${flightId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // Clean up the interceptors
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  }
};

const createReservation = async (email, price, flights, passengers) => {
  const accessToken = getAccessToken();
  const requestInterceptor = setupRequestInterceptors(accessToken);
  const responseInterceptor = setupResponseInterceptors(refresh);

  try {
    const response = await axiosPrivate.post(
      `${SERVER}/reservation/create`,
      {
        price: price,
        email: email,
        passengers: passengers,
        flights: flights,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    // Clean up the interceptors
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  }
};

const getReservationsByUser = async () => {
  const accessToken = getAccessToken();
  const requestInterceptor = setupRequestInterceptors(accessToken);
  const responseInterceptor = setupResponseInterceptors(refresh);

  try {
    const response = await axiosPrivate.get(`${SERVER}/reservation/history`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    // Clean up the interceptors
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  }
};

export {
  generateRandomSeatsByNumOfPassengers,
  getSeatsByFlightId,
  createReservation,
  getReservationsByUser,
};
