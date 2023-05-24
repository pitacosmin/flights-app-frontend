import { Grid } from "@mui/material";
import OneSeat from "./OneSeat";
import { useEffect, useState } from "react";

const rowStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
};

const occupiedSeatStyle = {
  width: "30px",
  height: "30px",
  backgroundColor: "lightgrey",
  margin: "2px 2.5px",
  borderRadius: "3px",
};

const seatStyle = {
  width: "30px",
  height: "30px",
  backgroundColor: "#2980b9", //blue
  margin: "2px 2.5px",
  borderRadius: "3px",
  textAlign: "center",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const spacerStyle = {
  textAlign: "center",
  color: "grey",
  width: "30px", // adjust this value to increase the space between columns
  margin: "2px 2.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const DepartureSeatMap = ({
  occupiedSeats,
  layout,
  capacity,
  passengers,
  setPassengers,
  selectedDepartureSeats,
  setSelectedDepartureSeats,
}) => {
  const numOfPassengers = passengers.length;
  const seatsPerRow = layout.reduce((total, group) => total + group, 0);
  const numRows = Math.ceil(capacity / seatsPerRow);

  //   const [selectedDepartureSeats, setSelectedDepartureSeats] = useState([]);

  useEffect(() => {
    console.log("departure seats", selectedDepartureSeats);
  }, [selectedDepartureSeats]);

  useEffect(() => {
    console.log("passengers", passengers);
  }, [passengers]);

  useEffect(() => {
    const updatedSeatsForPassengers = passengers.map((passenger, index) => {
      return {
        ...passenger,
        // departureSeatNumber: selectedSeats[index],
        departureSeatNumber: selectedDepartureSeats[index],
      };
    });

    setPassengers(updatedSeatsForPassengers);
  }, [selectedDepartureSeats]);

  const isSeatOccupied = (seatNumber) => {
    return occupiedSeats.includes(seatNumber);
  };

  const seats = [];

  for (let i = 0; i < numRows; i++) {
    //create the row
    const rowSeats = [];

    let colCount = 0;
    layout.forEach((seatGroup) => {
      for (let j = 0; j < seatGroup; j++) {
        const seatNumber = `${i + 1}${String.fromCharCode(65 + colCount)}`;
        if (isSeatOccupied(seatNumber)) {
          rowSeats.push(
            <OneSeat style={occupiedSeatStyle} key={`${i}-${colCount}`} />
          );
        } else {
          rowSeats.push(
            <OneSeat
              style={seatStyle}
              key={`${i}-${colCount}`}
              seatLetter={String.fromCharCode(65 + colCount)}
              index={i + 1}
              setSelectedSeats={setSelectedDepartureSeats}
              selectedSeats={selectedDepartureSeats}
              numOfPassengers={numOfPassengers}
            />
          );
        }
        colCount++;
      }
      if (colCount < seatsPerRow) {
        rowSeats.push(
          <div style={spacerStyle} key={`${i}-${colCount}-spacer`}>
            {i + 1}
          </div>
        );
      }
    });

    //insert the whole row
    seats.push(
      <div style={rowStyle} key={i}>
        {rowSeats}
      </div>
    );
  }

  return (
    <Grid item xs={6}>
      {seats}
    </Grid>
  );
};

export default DepartureSeatMap;
