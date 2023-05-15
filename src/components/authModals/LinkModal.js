import { Box, Divider, Grid, Link, Typography } from "@mui/material";

const LinkModal = ({ text, handleSwitch, description }) => {
  return (
    <Box paddingTop="30px">
      <Divider flexItem color="black" />
      <Grid container direction="row" padding="10px">
        <Typography marginRight="5px">{description}</Typography>
        <Link
          component="button"
          onClick={handleSwitch}
          underline="always"
          variant="body1"
        >
          {text}
        </Link>
      </Grid>
    </Box>
  );
};

export default LinkModal;
