import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Title = styled(Typography)`
  color: grey;
`;

const PassengerInfo = ({ type, index, onPassangerDataChange }) => {
  const [passengerData, setPassengerData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    passportId: "",
  });

  const handlePassengerDataChange = (event) => {
    setPassengerData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    onPassangerDataChange(index, passengerData);
  }, [passengerData]);

  const { title, firstName, lastName, passportId } = passengerData;
  return (
    <Box component="form">
      <Grid item xs={12} key={`${index}`} style={{ padding: "10px 0px" }}>
        <Paper style={{ padding: "20px" }}>
          <Grid container direction="row" alignItems="center">
            <Typography>{index + 1}.Passenger</Typography>
            <Title variant="caption" paddingLeft="5px">
              ({type})
            </Title>
          </Grid>
          <Grid container direction="row" spacing={4} padding="10px 0px">
            <Grid item container xs={1} direction="column">
              <Title variant="body2">Title</Title>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={title}
                name="title"
                onChange={handlePassengerDataChange}
                size="small"
              >
                <MenuItem value={"Mr"}>Mr</MenuItem>
                <MenuItem value={"Mrs"}>Mrs</MenuItem>
                <MenuItem value={"Ms"}>Ms</MenuItem>
              </Select>
            </Grid>
            <Grid item container xs={3} direction="column">
              <Title variant="body2">First name</Title>
              <TextField
                size="small"
                value={firstName}
                name="firstName"
                onChange={handlePassengerDataChange}
                InputProps={{
                  required: true,
                }}
              ></TextField>
            </Grid>
            <Grid item container xs={3} direction="column">
              <Title variant="body2">Last name</Title>
              <TextField
                size="small"
                value={lastName}
                name="lastName"
                onChange={handlePassengerDataChange}
                InputProps={{
                  required: true,
                }}
              ></TextField>
            </Grid>
            <Grid item container xs={3} direction="column">
              <Title variant="body2">Passport ID</Title>
              <TextField
                size="small"
                value={passportId}
                name="passportId"
                onChange={handlePassengerDataChange}
                InputProps={{
                  required: true,
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default PassengerInfo;
