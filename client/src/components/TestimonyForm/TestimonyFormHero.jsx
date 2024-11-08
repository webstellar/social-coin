import PropTypes from "prop-types";
import TestimonyModalLayout from "./TestimonyModalLayout";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Autocomplete,
  Avatar,
  IconButton,
  Button,
  Divider,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const TestimonyFormHero = ({ heroes, setOpenHero, hero, setHero }) => {
  return (
    <TestimonyModalLayout>
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
          <Typography gutterBottom={false}>Select your Humble Hero</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          sm={2}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
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
      <Divider sx={{ bgcolor: "background.paper", mb: 2 }} />
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Autocomplete
          fullWidth
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
          onChange={(e, value) => setHero(value.name)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenHero(false);
          }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

TestimonyFormHero.propTypes = {
  setHero: PropTypes.any,
  setOpenHero: PropTypes.any,
  hero: PropTypes.string,
  heroes: PropTypes.array,
};

export default TestimonyFormHero;
