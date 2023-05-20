import React, { useEffect, useMemo, useState } from "react";
import TitleHeader from "./TitleHeader";
import { Box, Button, Grid } from "@mui/material";
import PassengerInfo from "./PassengerInfo";
import { ElmGreen } from "../../../../assets/colors";
import { capitalize } from "../../../../utils/stringFormat";
import { useDispatch } from "react-redux";
import { setPassengers } from "../../../../redux/features/passengerSlice";
import GoBackButton from "../../../../components/GoBackButton";

const Passengers = ({ goToSeats, goBack, passengers, setPassengersData }) => {
  const [passengerData, setPassengerData] = useState([]);

  const handlePassengerDataChange = (index, data) => {
    setPassengerData((prevPassengersData) => {
      prevPassengersData[index] = data;

      return [...prevPassengersData];
    });
  };

  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(setPassengers({ passengerData }));
    setPassengersData(passengerData);
    goToSeats();
  };

  const arePassengersFieldsFilled = passengerData.every(
    (passenger) =>
      passenger.title.trim() !== "" &&
      passenger.firstName.trim() !== "" &&
      passenger.lastName.trim() !== "" &&
      passenger.passportId.trim() !== ""
  );

  const PassengerComponents = useMemo(() => {
    let passengerIndex = 0;

    const passangers = [];

    Object.entries(passengers).map(([type, count]) => {
      const passengerType = capitalize(type);
      Array.from({ length: count }, () => {
        passangers.push(
          <PassengerInfo
            key={`${type}-${passengerIndex}`}
            type={passengerType}
            index={passengerIndex}
            onPassangerDataChange={handlePassengerDataChange}
          />
        );
        passengerIndex++;
      });
    });

    return passangers;
  }, [passengers]);

  return (
    <Box>
      <Grid item xs={12}>
        <TitleHeader></TitleHeader>
        <Box>{PassengerComponents}</Box>
        <Grid container justifyContent="space-between">
          <GoBackButton goBack={goBack} />
          <Button
            onClick={handleButtonClick}
            size="large"
            variant="contained"
            sx={{ backgroundColor: ElmGreen }}
            disabled={!arePassengersFieldsFilled}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Passengers;
