import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { getMyGratitudes } from "../../redux/gratitudes/myGratitudeSlice";
import GeneralPagination from "../GeneralPagination/GeneralPagination";
import { Spinner } from "../Spinner/Spinner";

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
  const [currentPage, setCurrentPage] = useState(1);

  const { heroes, numberOfPages, loading } = useSelector((state) => ({
    ...state.heroes,
  }));

  //To display heroes by category use categoryHeroes in the useSelector

  useEffect(() => {
    dispatch(getHeroes(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getMyGratitudes());
  }, [dispatch, currentPage]);

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
              <GrLink to="/heroes">
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
            {loading ? (
              <Spinner />
            ) : (
              <Grid container spacing={4}>
                {heroes &&
                  heroes.map((hero) => (
                    <HeroesCard key={hero._id} hero={hero} />
                  ))}
              </Grid>
            )}
          </GrDiv>
          <div>
            <GeneralPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          </div>
        </Container>
      </GrBox>
    </>
  );
};

export default HomeHeroCategory;
