import { useState } from "react";
import EmailField from "../../components/authModals/EmailField";
import PasswordField from "../../components/authModals/PasswordField";
import { Grid, Box, Modal } from "@mui/material";
import { register } from "../../api/apiClient";
import LinkModal from "../../components/authModals/LinkModal";
import SubmitButton from "../../components/authModals/SubmitButton";
import ModalHeader from "../../components/authModals/ModalHeader";
import { validateEmail, validatePassword } from "../../utils/validations";

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

const SignUp = ({ handleClose, open, handleSwitch }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMatchingPasswords, setIsMatchingPasswords] = useState(false);
  const [existsUser, setExistsUser] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));

    //Not sure
    setIsMatchingPasswords(confirmationPassword === newPassword);
  };

  const handleConfirmationPasswordChange = (event) => {
    const confirmation = event.target.value;
    setConfirmationPassword(event.target.value);
    setIsMatchingPasswords(confirmation === password);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    if (!isValidEmail) {
      console.log(email + " is not a valid email");
      return;
    }

    if (!isValidPassword) {
      console.log("Password must be at least 8 characters long");
      return;
    }

    if (confirmationPassword !== password) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const token = await register(email, password);

      if (token) {
        console.log("Successfully registered as " + email);
        localStorage.setItem("token", token);
        resetStates();
      } else {
        console.log("Registration failed for " + email);
        setExistsUser(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 500) {
        console.log("User already exists");
      }
    }
  };

  const resetStates = () => {
    setIsFormSubmitted(false);
    setExistsUser(null);
    setEmail("");
    setPassword("");
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={resetStates}>
        <Box sx={style}>
          <ModalHeader handleClose={resetStates} text="Sign up"></ModalHeader>
          <form onSubmit={handleSignUp}>
            <Grid container spacing={1}>
              <EmailField
                handleEmailChange={handleEmailChange}
                isValid={isValidEmail}
                isFormSubmitted={isFormSubmitted}
                user={existsUser}
              ></EmailField>
              <PasswordField
                handlePasswordChange={handlePasswordChange}
                isValid={isValidPassword}
                isFormSubmitted={isFormSubmitted}
              ></PasswordField>
              <PasswordField
                handlePasswordChange={handleConfirmationPasswordChange}
                text="Confirm password"
                isMatchingPasswords={isMatchingPasswords}
                isFormSubmitted={isFormSubmitted}
              ></PasswordField>
            </Grid>
            <SubmitButton text="Sign Up" />
            <LinkModal
              description="Already have an account?"
              handleSwitch={handleSwitch}
              text="Log in"
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUp;
