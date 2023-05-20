import { Button } from "@mui/material";
import React from "react";

const GoBackButton = ({ goBack }) => {
  return (
    <Button
      onClick={goBack}
      size="large"
      variant="outlined"
      style={{ color: "grey", borderColor: "grey" }}
    >
      Go back
    </Button>
  );
};

export default GoBackButton;
