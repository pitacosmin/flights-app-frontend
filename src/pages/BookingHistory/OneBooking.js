import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Tickets from "../../assets/passport-ticket.png";
import ReservationSummary from "./ReservationSummary";
import ReservationDetailsModal from "./ReservationDetails/ReservationDetailsModal";

const OneBooking = ({ reservation }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: "20px", display: "flex", padding: "0px 30px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxHeight: "100px",
            maxWidth: "100px",
          }}
          image={Tickets}
          alt="Tickets"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: 1,
          margin: "0px 20px",
        }}
      >
        <CardContent>
          <ReservationSummary reservation={reservation} />
        </CardContent>
        <CardActions>
          <Divider
            variant="middle"
            orientation="vertical"
            style={{
              width: "1px",
              backgroundColor: "grey",
              margin: "0px 80px",
            }}
          ></Divider>
          <Button variant="outlined" onClick={handleOpen}>
            Details
          </Button>
        </CardActions>
      </Box>
      <ReservationDetailsModal
        open={open}
        handleClose={handleClose}
        reservation={reservation}
      />
    </Card>
  );
};

export default OneBooking;
