import { Button, Divider, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalHeader = ({ handleClose, text }) => {
  return (
    <Grid padding="0px 0px 20px 0px">
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h4">{text}</Typography>
        <Button onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </Button>
      </Grid>
      <Divider flexItem color="black"></Divider>
    </Grid>
  );
};

export default ModalHeader;
