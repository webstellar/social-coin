import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { getMyGratitudes } from "../../redux/gratitudes/myGratitudeSlice";

import { Container, Grid } from "@mui/material";
import {
  GrBox,
  GrTypography,
  GrCTypography,
  GrLink,
  GrDiv,
} from "./HomeHeroCategory.styles";

import HeroesCard from "../HeroesCard/HeroesCard";

const HomeHeroCategory = () => {
  const dispatch = useDispatch();

  const { heroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  //To display heroes by category use categoryHeroes in the useSelector

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyGratitudes());
  }, [dispatch]);

  return (
    <>
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
                heroes.map((hero) => <HeroesCard key={hero._id} hero={hero} />)}
            </Grid>
          </GrDiv>
        </Container>
      </GrBox>
    </>
  );
};

export default HomeHeroCategory;
