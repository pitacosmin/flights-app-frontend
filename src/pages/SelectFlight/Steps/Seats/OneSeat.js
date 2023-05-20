import { useState } from "react";

const selectedSeatStyle = {
  width: "30px",
  height: "30px",
  backgroundColor: "#e67e22",
  margin: "2px 2.5px",
  borderRadius: "3px",
  textAlign: "center",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const OneSeat = ({
  style,
  seatLetter,
  index,
  setSelectedSeats,
  selectedSeats,
  numOfPassengers,
}) => {
  const seatNumber = index + seatLetter;
  const [isSeatSelected, setIsSeatSelected] = useState(false);
  const handleSelectSeat = () => {
    console.log(seatNumber);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < numOfPassengers) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        console.log("Cannot select anymore");
        return;
      }
    }

    setIsSeatSelected(!isSeatSelected);
  };

  return (
    <div
      style={isSeatSelected ? selectedSeatStyle : style}
      onClick={selectedSeats ? handleSelectSeat : null}
    >
      {seatLetter}
    </div>
  );
};

export default OneSeat;
