import { Button, Grid } from "@mui/material";
import { ElmGreen } from "../../../../assets/colors";
import GoBackButton from "../../../../components/GoBackButton";

const BottomButtons = ({ goBack, handleButtonClick }) => {
  return (
    <Grid container justifyContent="space-between" padding={"20px 0px"}>
      <GoBackButton goBack={goBack} />
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
