import { Paper, Stack, Box, Grid } from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { SurfieGreen } from "../../assets/colors";
import "./DetailsHeader.css";
const DetailsHeader = ({ originCity, destinationCity }) => {
  return (
    <Grid item xs={12}>
      <Paper elevation={2} className="paper-header">
        <Stack
          direction="row"
          spacing={1}
          className="header__cities"
          color={SurfieGreen}
        >
          <Box>{originCity}</Box>
          <AirplaneTicketIcon fontSize="large" />
          <Box>{destinationCity}</Box>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default DetailsHeader;
