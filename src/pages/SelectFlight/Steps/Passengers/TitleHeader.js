import { Box, Typography } from "@mui/material";
import { SurfieGreen } from "../../../../assets/colors";

function TitleHeader() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 0px",
      }}
      color={SurfieGreen}
    >
      <Typography variant="h5" letterSpacing={"0.1rem"}>
        Passengers
      </Typography>
      <Typography variant="caption">
        Please add the passenger's name as it is written on their documents (eg.
        passport or ID). Do not use any accents or special characters. Do not
        use a nickname.
      </Typography>
    </Box>
  );
}

export default TitleHeader;
