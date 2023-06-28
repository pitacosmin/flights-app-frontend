import { Autocomplete, Grid, Typography, Divider, Paper } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { CustomTextField } from "./CustomAutocomplete.style";
import styled from "@emotion/styled";

const StyledAutocomplete = styled(Autocomplete)`
  padding: 5px 0px;
  margin-bottom: 5px;
`;

function CustomAutocomplete({ value, options, handleDataChange, labelText }) {
  const filterOptions = (options, { inputValue }) => {
    return options.filter(
      (option) =>
        option.airportName.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.cityName.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.airportIataCode
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        option.countryName.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <StyledAutocomplete
      // className="linear_border"
      value={value}
      options={options}
      onChange={handleDataChange}
      isOptionEqualToValue={(option, value) =>
        option.airportIataCode === value?.airportIataCode
      }
      getOptionLabel={(option) =>
        `${option.cityName} (${option.airportIataCode})`
      }
      filterOptions={filterOptions}
      noOptionsText={"There is no result for this search! :("}
      forcePopupIcon={false}
      sx={{ padding: 1 }}
      renderOption={(props, option, state) => {
        const optionIndex = props["data-option-index"];
        return (
          <div key={option.airportIataCode}>
            <Grid
              {...props}
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item container direction="row">
                <Typography
                  fontWeight={"bold"}
                  fontSize={"14px"}
                  color={"#373D3F"}
                >
                  <TravelExploreIcon
                    fontSize="small"
                    style={{ paddingRight: "5px" }}
                  />
                  {option.airportName} ({option.airportIataCode}),{" "}
                  {option.cityName}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  fontStyle={"italic"}
                  color={"grey"}
                  fontSize={"14px"}
                >
                  {option.countryName}
                </Typography>
              </Grid>
            </Grid>
            {optionIndex !== options.length - 1 && (
              <Divider flexItem style={{ backgroundColor: "black" }} />
            )}
          </div>
        );
      }}
      renderInput={(params) => (
        <Paper
          sx={{ paddingTop: 1, bgcolor: "#FDFDFD" }}
          elevation={0}
          style={{ border: "solid 2px lightgrey" }}
        >
          <CustomTextField {...params} label={labelText} variant="outlined" />
        </Paper>
      )}
    />
  );
}

export default CustomAutocomplete;
