import axios from "axios";
import { SERVER } from "../data/constants";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get(`${SERVER}/api/auth/token/refresh`, {
      withCredentials: true,
    });
    const prevAccessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      .split("=")[1];
    console.log("Previous access token", prevAccessToken);
    console.log("NEW token", response.data.accessToken);
    document.cookie = `accessToken=${response.data.accessToken}`;
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
