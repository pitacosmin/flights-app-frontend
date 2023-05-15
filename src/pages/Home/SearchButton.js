import { Button, Grid } from "@mui/material";
import React from "react";
import { ElmGreen } from "../../assets/colors";

const SearchButton = ({ handleSearch }) => {
  return (
    <Grid item xs={12} id="search-button">
      <Button
        size="large"
        variant="contained"
        style={{ backgroundColor: ElmGreen }}
        fullWidth
        onClick={handleSearch}
      >
        Search
      </Button>
    </Grid>
  );
};

export default SearchButton;
