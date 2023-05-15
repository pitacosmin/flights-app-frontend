import { Box, Button } from "@mui/material";

const SubmitButton = ({ text }) => {
  return (
    <Box paddingTop="20px">
      <Button fullWidth variant="contained" type="submit">
        {text}
      </Button>
    </Box>
  );
};

export default SubmitButton;
