import { Button, Grid } from "@mui/material";
import { ElmGreen } from "../../../../assets/colors";

const BottomButtons = ({ goBack, handleButtonClick }) => {
  return (
    <Grid container justifyContent="space-between">
      <Button
        onClick={goBack}
        size="large"
        variant="contained"
        sx={{ backgroundColor: ElmGreen }}
      >
        Go back
      </Button>
      <Button
        onClick={handleButtonClick}
        size="large"
        variant="contained"
        sx={{ backgroundColor: ElmGreen }}
      >
        Continue
      </Button>
    </Grid>
  );
};

export default BottomButtons;
