import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import Benefit from "./Benefit";
import BackpackIcon from "@mui/icons-material/Backpack";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import LuggageIcon from "@mui/icons-material/Luggage";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const HeaderGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const SolidDivider = styled(Divider)`
  border-width: 1px;
  border-color: black;
`;

const BenefitsGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0px;
`;

const FareCard = ({
  headerTitle,
  headerPlan,
  planColor,
  goToPassengers,
  totalPrice,
}) => {
  const iconProps = {
    fontSize: "large",
    sx: { color: planColor },
  };

  const benefits = [
    {
      icon: <BackpackIcon {...iconProps} />,
      text: "Free carry on bag",
      description: ["Must fit under the seat", "(40cm x 20cm x 25cm)"],
    },
    {
      icon: <FlightClassIcon {...iconProps} />,
      text: "Seat selection",
      description: ["Specific row selection"],
    },
    {
      icon: <LuggageIcon {...iconProps} />,
      text: "20kg checked-in bag",
      description: ["Must be dropped at check-in desk"],
    },
    {
      icon: <EventBusyIcon {...iconProps} />,
      text: "Free cancellation",
      description: [
        "Flexibility to cancel anytime without being taxed extra money",
      ],
    },
  ];

  const planBenefitsMap = {
    basic: 1,
    regular: 2,
    premium: benefits.length,
  };

  const numBenefitsToShow = planBenefitsMap[headerPlan.toLowerCase()];

  const visibleBenefits = benefits.slice(0, numBenefitsToShow);

  //TODO Handle the selection of benefit
  const handleSelectBenefit = () => {
    goToPassengers();
  };

  return (
    <Grid item xs={4}>
      <Paper
        style={{
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          direction="column"
          flex={1}
          justifyContent="space-between"
        >
          <Grid item>
            <HeaderGrid container>
              <Grid item>
                <Typography variant="h5">{headerTitle}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">{headerPlan}</Typography>
              </Grid>
            </HeaderGrid>
            <SolidDivider flexItem />
            <BenefitsGrid item container spacing={2}>
              {visibleBenefits.map((benefit) => (
                <Benefit
                  key={benefit.text}
                  headerPlan={headerPlan}
                  icon={benefit.icon}
                  text={benefit.text}
                  descriptions={benefit.description}
                ></Benefit>
              ))}
            </BenefitsGrid>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              disableRipple
              onClick={handleSelectBenefit}
              variant="contained"
              sx={{ backgroundColor: planColor }}
            >
              €{totalPrice}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FareCard;
