import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGratitudes } from "../../redux/gratitudes/gratitudesSlice";

import { Container, Grid } from "@mui/material";
import {
  GrBox,
  GrTypography,
  GrCTypography,
  GrLink,
  GrDiv,
} from "./HomeRecentTitle.styles";

import GratitudeCardBig from "../GratitudeCardBig/GratitudeCardBig";
import GeneralPagination from "../GeneralPagination/GeneralPagination";

const HomeRecentTitle = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { appreciations, numberOfPages } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  useEffect(() => {
    dispatch(getGratitudes(currentPage));
  }, [dispatch, currentPage]);

  const refreshAppreciations = () => {
    dispatch(getGratitudes(currentPage));
  };

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
                Testimonies
              </GrTypography>
            </Grid>
            <Grid item md={4}>
              <GrLink to="/testimonies">
                <GrCTypography
                  component="p"
                  variant="p"
                  color="inherit"
                  gutterBottom
                >
                  All Testimonies
                </GrCTypography>
              </GrLink>
            </Grid>
          </Grid>
          <GrDiv>
            <Grid container spacing={4}>
              {appreciations &&
                appreciations.map((appreciation) => (
                  <GratitudeCardBig
                    key={appreciation._id}
                    gratitude={appreciation}
                    currentPage={currentPage}
                  />
                ))}
            </Grid>
          </GrDiv>
          <GrDiv>
            <GeneralPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          </GrDiv>
        </Container>
      </GrBox>
    </>
  );
};

export default HomeRecentTitle;
