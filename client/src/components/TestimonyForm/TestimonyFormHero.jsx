import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Autocomplete,
  Avatar,
  IconButton,
  CssBaseline,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": {
    m: 1,
    width: "25ch",
  },
};

const TestimonyFormHero = ({ heroes, setOpenHero, hero, setHero }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={style}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          rowSpacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={10} md={10} sm={10}>
              <Typography gutterBottom={false}>
                Select your Humble Hero
              </Typography>
            </Grid>
            <Grid item xs={2} md={2} sm={2}>
              <IconButton
                disableRipple={true}
                color="inherit"
                onClick={() => {
                  setOpenHero(false);
                }}
              >
                <ClearIcon sx={{ fontSize: "2.0rem" }} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Autocomplete
              options={heroes}
              autoHighlight
              getOptionLabel={(option) => option.name || option}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > Avatar": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Avatar
                    src={option?.profilePicture?.url}
                    alt={option?.summary}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  {option.name}
                </Box>
              )}
              value={hero}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Find your humble hero"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "hero", // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={(e, value) => setHero(value?._id)}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

TestimonyFormHero.propTypes = {
  setHero: PropTypes.any,
  setOpenHero: PropTypes.any,
  hero: PropTypes.string,
  heroes: PropTypes.array,
};

export default TestimonyFormHero;
