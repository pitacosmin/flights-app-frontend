import { useState } from "react";
import EmailField from "../../components/authModals/EmailField";
import PasswordField from "../../components/authModals/PasswordField";
import { Alert, Box, Grid, Modal } from "@mui/material";
import { authenticate } from "../../api/apiClient";
import LinkModal from "../../components/authModals/LinkModal";
import SubmitButton from "../../components/authModals/SubmitButton";
import ModalHeader from "../../components/authModals/ModalHeader";
import { validateEmail } from "../../utils/validations";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

//remove
import useRefreshToken from "../../hooks/useRefreshToken";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: 0,
};

const LogIn = ({ handleClose, open, handleSwitch }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    if (!isValidEmail) {
      console.log(email + " is not valid");
      return;
    }
    try {
      const response = await authenticate(email, password);
      console.log("res", response);
      if (response) {
        // successful authentication, store token in local storage
        document.cookie = `accessToken=${response.accessToken}`;
        document.cookie = `refreshToken=${response.refreshToken}`;
        const userData = {
          email,
          isAuthenticated: true,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
        document.cookie = `userData=${JSON.stringify(userData)}`;
        console.log(
          "Succesfully logged in as " + email + " with password " + password
        );
        dispatch(
          login({
            email,
            isAuthenticated: true,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          })
        );
        // do something else, like redirect to another page
        resetState();
      } else {
        // authentication failed
        // show an error message or do something else
        console.log("Auth failed for " + email + " with password " + password);
        setErrorMessage("Wrong password or e-mail address. Please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    setEmail("");
    setPassword("");
    setIsFormSubmitted(false);
    setErrorMessage("");
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={resetState}>
        <Box sx={style}>
          <ModalHeader handleClose={resetState} text="Log in"></ModalHeader>
          <form onSubmit={handleLogIn}>
            <Grid container spacing={1}>
              <EmailField
                handleEmailChange={handleEmailChange}
                isValid={isValidEmail}
                isFormSubmitted={isFormSubmitted}
              ></EmailField>
              <PasswordField
                handlePasswordChange={handlePasswordChange}
              ></PasswordField>
              <Grid item xs={12}>
                {errorMessage && (
                  <Alert severity="warning">{errorMessage}</Alert>
                )}
              </Grid>
            </Grid>
            <SubmitButton text="Log In" />
            <LinkModal
              description="Don't have an account?"
              handleSwitch={handleSwitch}
              text="Register"
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LogIn;
