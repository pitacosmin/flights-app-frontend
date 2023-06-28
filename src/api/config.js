import { axiosPrivate } from "./protectedApiClient";

const setupRequestInterceptors = (accessToken) => {
  return axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const setupResponseInterceptors = (refresh) => {
  return axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
};

const getAccessToken = () => {
  const accessTokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));

  if (accessTokenCookie) {
    return accessTokenCookie.split("=")[1];
  }

  return null;
};

export { setupRequestInterceptors, setupResponseInterceptors, getAccessToken };
