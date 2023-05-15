import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { Outlet } from "react-router-dom";
import { login } from "../../redux/features/userSlice";

const PersistLogin = () => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        const persistedUserData = JSON.parse(
          document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("userData="))
            .split("=")[1]
        );

        if (persistedUserData) {
          persistedUserData.accessToken = newAccessToken;
          console.log(persistedUserData);
          dispatch(login(persistedUserData));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
