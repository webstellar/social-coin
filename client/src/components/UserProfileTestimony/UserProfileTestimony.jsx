import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGratitudes } from "../../redux/gratitudes/gratitudesSlice";
import { getMyGratitudes } from "../../redux/gratitudes/myGratitudeSlice";

import { Container, Grid, Typography } from "@mui/material";
import {
  GrBox,
  GrTypography,
  GrCTypography,
  GrLink,
  GrDiv,
} from "./UserProfileTestimony.styles";

import GratitudeCard from "../GratitudeCard/GratitudeCard";

const UserProfileTestimony = () => {
  const dispatch = useDispatch();

  const { myappreciations } = useSelector((state) => ({
    ...state.mygratitudes,
  }));

  const [isPending] = useTransition(myappreciations);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGratitudes());
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
              spacing={2}
            >
              <Grid item md={6}>
                <GrTypography
                  component="p"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                >
                  My Testimony collection
                </GrTypography>
              </Grid>
              <Grid item md={6}>
                <GrLink to="/create-testimony">
                  <GrCTypography
                    component="p"
                    variant="p"
                    color="inherit"
                    gutterBottom
                  >
                    Add a Testimony
                  </GrCTypography>
                </GrLink>
              </Grid>
            </Grid>

            <GrDiv>
              {isPending ? (
                <Typography
                  color="secondary"
                  variant="h5"
                  sx={{ fontWeight: "300" }}
                >
                  You have no gratitudes to show
                </Typography>
              ) : (
                <Grid container spacing={4}>
                  {myappreciations
                    .map((appreciation) => (
                      <GratitudeCard
                        key={appreciation._id}
                        gratitude={appreciation}
                      />
                    ))
                    .reverse()}
                </Grid>
              )}
            </GrDiv>
          </Container>
        </GrBox>
      ) : null}
    </>
  );
};

export default UserProfileTestimony;
