import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { getMyGratitudes } from "../../redux/gratitudes/myGratitudeSlice";

import { Container, Typography, Grid } from "@mui/material";
import {
  GrBox,
  GrTypography,
  GrCTypography,
  GrLink,
  GrDiv,
} from "./HomeHeroCategory.styles";

import GratitudeCard from "../GratitudeCard/GratitudeCard";
import HeroCard from "../HeroCard/HeroCard";

const HomeHeroCategory = () => {
  const dispatch = useDispatch();

  const { myappreciations } = useSelector((state) => ({
    ...state.mygratitudes,
  }));

  const { user } = useSelector((state) => state.auth);
  const { heroes, categoryHeroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyGratitudes());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <GrBox sx={{ flexGrow: 1 }}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item md={8}>
                <GrTypography
                  component="p"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                >
                  Your recent stories, {user?.name}
                </GrTypography>
              </Grid>
              <Grid item md={4}>
                <GrLink to="/my-profile">
                  <GrCTypography
                    component="p"
                    variant="p"
                    color="inherit"
                    gutterBottom
                  >
                    My collection
                  </GrCTypography>
                </GrLink>
              </Grid>
            </Grid>

            <GrDiv>
              {myappreciations ? (
                <Grid container spacing={4}>
                  {myappreciations
                    .map((appreciation) => (
                      <GratitudeCard
                        key={appreciation._id}
                        gratitude={appreciation}
                      />
                    ))
                    .reverse()
                    .slice(1, 4)}
                </Grid>
              ) : (
                <Typography
                  color="secondary"
                  variant="h5"
                  sx={{ fontWeight: "300" }}
                >
                  You have no gratitudes to show
                </Typography>
              )}
            </GrDiv>
          </Container>
        </GrBox>
      ) : null}

      <GrBox sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={8}>
              <GrTypography
                omponent="p"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Latest Heroes
              </GrTypography>
            </Grid>
            <Grid item md={4}>
              <GrLink to="/heroeslist">
                <GrCTypography
                  component="p"
                  variant="p"
                  color="inherit"
                  gutterBottom
                >
                  All heroes
                </GrCTypography>
              </GrLink>
            </Grid>
          </Grid>
          <GrDiv>
            <Grid container spacing={4}>
              {heroes &&
                heroes.map((hero) => <HeroCard key={hero._id} hero={hero} />)}
            </Grid>
          </GrDiv>
        </Container>
      </GrBox>
      <GrBox sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={8}>
              <GrTypography
                omponent="p"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Family
              </GrTypography>
            </Grid>
            <Grid item md={4}>
              <GrLink to="/my-profile">
                <GrCTypography
                  component="p"
                  variant="p"
                  color="inherit"
                  gutterBottom
                >
                  All collections
                </GrCTypography>
              </GrLink>
            </Grid>
          </Grid>
          <GrDiv>
            <Grid container spacing={4}>
              {categoryHeroes &&
                categoryHeroes.map((hero) => ({
                  ...(<HeroCard key={hero._id} hero={hero} />),
                  categories: hero.categories.filter(
                    (subhero) => subhero.categories === "Family"
                  ),
                }))}
            </Grid>
          </GrDiv>
        </Container>
      </GrBox>
    </>
  );
};

export default HomeHeroCategory;
