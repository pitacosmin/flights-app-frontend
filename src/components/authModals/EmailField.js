import { Grid, TextField, Typography } from "@mui/material";

const EmailField = ({ handleEmailChange, isValid, isFormSubmitted, user }) => {
  const helperText =
    isFormSubmitted && !isValid
      ? "Please enter a valid email."
      : user
      ? "Email already in use"
      : null;

  const error = !isValid && isFormSubmitted ? true : user ? true : false;

  return (
    <Grid item container xs={12} direction="column">
      <Typography variant="body2" color="grey" my={0.5}>
        Email address
      </Typography>
      <TextField
        size="small"
        placeholder="email@email.com"
        onChange={handleEmailChange}
        required
        error={error}
        helperText={helperText}
      ></TextField>
    </Grid>
  );
};

export default EmailField;
