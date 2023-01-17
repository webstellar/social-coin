import React from "react";
import PropTypes from "prop-types";
import { GrDiv, GrParaBox } from "./CategoryAppreciationList.styles";
import { Grid, Container } from "@mui/material";
import GratitudeCardBig from "../GratitudeCardBig/GratitudeCardBig";

const CategoryAppreciationList = ({ appreciations }) => {
  return (
    <div>
      <Container maxWidth="lg">
        <GrParaBox>
          <GrDiv>
            <Grid container spacing={4}>
              {appreciations &&
                appreciations.map((appreciation) => (
                  <GratitudeCardBig
                    key={appreciation._id}
                    gratitude={appreciation}
                  />
                ))}
            </Grid>
          </GrDiv>
        </GrParaBox>
      </Container>
    </div>
  );
};

CategoryAppreciationList.propTypes = {
  appreciations: PropTypes.array,
};

export default CategoryAppreciationList;
