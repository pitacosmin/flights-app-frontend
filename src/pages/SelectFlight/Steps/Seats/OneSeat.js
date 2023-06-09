import { useEffect, useState } from "react";

const selectedSeatStyle = {
  width: "30px",
  height: "30px",
  backgroundColor: "#e67e22", //orange
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

  useEffect(() => {
    if (seatNumber) {
      if (selectedSeats.includes(seatNumber)) {
        setIsSeatSelected(true);
      }
    }
  }, [selectedSeats]);

  const handleSelectSeat = () => {
    console.log(seatNumber);

    if (isSeatSelected) {
      setSelectedSeats(
        selectedSeats.map((seat) => (seat === seatNumber ? null : seat))
      );
    } else {
      if (selectedSeats.length < numOfPassengers) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        const nullIndex = selectedSeats.indexOf(null);
        if (nullIndex !== -1) {
          const updatedSeats = [...selectedSeats];
          updatedSeats[nullIndex] = seatNumber;
          setSelectedSeats(updatedSeats);
        } else {
          console.log("Cannot select anymore");
          return;
        }
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
