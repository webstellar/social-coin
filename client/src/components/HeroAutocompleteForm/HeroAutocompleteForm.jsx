import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Autocomplete,
  Avatar,
  Grid,
  TextField,
} from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GrTypography } from "./HeroAutocompleteForm.styles";

const HeroAutocompleteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hero, setHero] = React.useState();
  const [fakeHero, setFakeHero] = React.useState("");

  const { heroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  React.useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch]);

  const heroDisplay = heroes.filter((halo) =>
    fakeHero === halo.name ? halo : null
  );

  React.useEffect(() => {
    if (heroDisplay.length > 0) {
      setHero(heroDisplay[0]._id);
    }
  }, [setHero, navigate, hero, heroDisplay]);

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="stretch"
          rowSpacing={5}
        >
          <Grid item xs={12} md={12}>
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
              onChange={(e, value) => setFakeHero(value.name)}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              fullWidth
            >
              <Button disabled></Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={() => {
                  navigate("/create-testimony", { state: { data: hero } });
                }}
                fullWidth
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 10 }} />}
              >
                <GrTypography variant="h6" component="p" color="fff">
                  NEXT
                </GrTypography>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HeroAutocompleteForm;
