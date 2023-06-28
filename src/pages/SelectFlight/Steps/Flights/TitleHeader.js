import { SurfieGreen } from "../../../../assets/colors";
import { Box, Typography } from "@mui/material";
import MapIcon from "../../../../assets/map.png";

const TitleHeader = ({ originCity, destinationCity }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 0px",
      }}
      color={SurfieGreen}
    >
      <img
        src={MapIcon}
        alt="map-icon"
        style={{ maxHeight: "50px", maxWidth: "50px", marginRight: "10px" }}
      />
      <Typography variant="h5" letterSpacing={"0.1rem"}>
        <b>{originCity}</b> to {destinationCity}
      </Typography>
    </Box>
  );
};

export default TitleHeader;
