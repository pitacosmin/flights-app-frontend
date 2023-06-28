import { Box, Card, CardContent, CardHeader, Modal } from "@mui/material";
import React from "react";
import DetailsTitle from "./DetailsTitle";
import DetailsContent from "./DetailsContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.card",
  width: 1000,
  height: 700,
  boxShadow: 24,
  p: 0,
  outline: 0,
  overflowY: "auto",
  scrollbarWidth: "thin", // Hide the scrollbar (works in Firefox)
  "&::-webkit-scrollbar": {
    width: "0.4em",
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },
};

const ReservationDetailsModal = ({ open, handleClose, reservation }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          <CardHeader
            title={<DetailsTitle reservation={reservation} />}
            sx={{ backgroundColor: "#dddddd" }}
          ></CardHeader>
          <CardContent style={{ padding: "0px" }}>
            <DetailsContent reservation={reservation} />
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ReservationDetailsModal;
