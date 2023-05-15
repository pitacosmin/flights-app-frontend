import { Grid } from "@mui/material";

const SeatMap = ({ departureSeats, returnSeats, layout, capacity }) => {
  const seatsPerRow = layout.reduce((total, columns) => total + columns, 0);
  const numRows = Math.ceil(capacity / seatsPerRow);

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  };

  const seatStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "gray",
    marginRight: "5px",
  };

  const spacerStyle = {
    width: "20px", // adjust this value to increase the space between columns
  };

  const seats = [];

  for (let i = 0; i < numRows; i++) {
    const rowSeats = [];

    let colCount = 0;
    layout.forEach((cols) => {
      for (let j = 0; j < cols; j++) {
        rowSeats.push(<div style={seatStyle} key={`${i}-${colCount}`} />);
        colCount++;
      }
      if (colCount < seatsPerRow) {
        rowSeats.push(
          <div style={spacerStyle} key={`${i}-${colCount}-spacer`} />
        );
        colCount++;
      }
    });

    seats.push(
      <div style={rowStyle} key={i}>
        {rowSeats}
      </div>
    );
  }

  return (
    <Grid item xs={7}>
      {seats}
    </Grid>
  );
};

export default SeatMap;
