import React from "react";
import PropTypes from "prop-types";
import { GrDiv, GrParaBox } from "./CategoryHeroList.styles";
import { Grid, Container } from "@mui/material";
import HeroCard from "../HeroCard/HeroCard";

const CategoryHeroList = ({ heroes }) => {
  return (
    <div>
      <Container maxWidth="lg">
        <GrParaBox>
          <GrDiv>
            <Grid container spacing={4}>
              {heroes &&
                heroes.map((hero) => <HeroCard key={hero._id} hero={hero} />)}
            </Grid>
          </GrDiv>
        </GrParaBox>
      </Container>
    </div>
  );
};

CategoryHeroList.propTypes = {
  heroes: PropTypes.array,
};

export default CategoryHeroList;
