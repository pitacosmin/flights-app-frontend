import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid, IconButton, styled, Typography } from "@mui/material";
import { capitalize } from "../../utils/stringFormat";

const TypeGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
`;

const TypeInfo = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Counter = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ageRange = {
  adults: "16+ years",
  teens: "12-15 years",
  children: "2-11 years",
  infants: "Under 2 years",
};

const PassengerTypePicker = ({ ageGroup, count, setPassengers }) => {
  const handleDecrease = () => {
    if (count > (ageGroup === "adults" ? 1 : 0)) {
      setPassengers((prevState) => ({
        ...prevState,
        [ageGroup]: prevState[ageGroup] - 1,
      }));
    }
  };

  const handleIncrease = () => {
    setPassengers((prevState) => ({
      ...prevState,
      [ageGroup]: prevState[ageGroup] + 1,
    }));
  };

  return (
    <TypeGrid container>
      <TypeInfo item xs={5}>
        <Typography>{capitalize(ageGroup)}</Typography>
        <Typography variant="caption">{ageRange[ageGroup]}</Typography>
      </TypeInfo>
      <Counter container item xs={5}>
        <Grid item>
          <IconButton onClick={handleDecrease}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>{count}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleIncrease}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Counter>
    </TypeGrid>
  );
};

export default PassengerTypePicker;
