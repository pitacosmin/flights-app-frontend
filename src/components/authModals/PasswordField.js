import { useState } from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const wrongPasswordMessage =
  "Please enter a password that is at least 8 characters long and includes at least one uppercase" +
  " letter, one lowercase letter, one number, and one special character.";

const notMatchingPasswordsMessage = "Passwords do not match";

const PasswordField = ({
  handlePasswordChange,
  text,
  isValid,
  isFormSubmitted,
  isMatchingPasswords,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let helperText = null;
  let error = false;
  if (isMatchingPasswords !== undefined && isFormSubmitted) {
    error = !isMatchingPasswords;
    helperText = !isMatchingPasswords ? notMatchingPasswordsMessage : null;
  } else if (isValid !== undefined && isFormSubmitted) {
    error = !isValid;
    helperText = !isValid ? wrongPasswordMessage : null;
  }

  return (
    <Grid item container xs={12} direction="column">
      <Typography variant="body2" color="grey" my={0.5}>
        {text ? text : "Password"}
      </Typography>
      <TextField
        size="small"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        onChange={handlePasswordChange}
        required
        error={error}
        helperText={helperText}
        sx={{ "& .MuiFormHelperText-root": { margin: "4px 0px" } }} //removes margin from helperText
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityIcon sx={{ color: "#1976d2" }} />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Grid>
  );
};

export default PasswordField;
