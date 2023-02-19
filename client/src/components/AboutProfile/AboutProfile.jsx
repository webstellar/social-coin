import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { GrBox } from "./AboutProfile.styles";
import PeterImg from "../../images/peter_onyegbule.jpg";
import XavierImg from "../../images/xavier_carbonel.jpg";

const teams = [
  {
    name: "Xavier Carbonel",
    picture: XavierImg,
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    LinkedIn: "https://www.linkedin.com/in/xaviercarbonel1/",
  },
  {
    name: "Peter Onyegbule",
    picture: PeterImg,
    profile:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    LinkedIn: "https://www.linkedin.com/in/peteronyegbule/",
  },
];

const AboutProfile = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <GrBox>
          <Typography variant="h6" component="p" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </GrBox>
        <GrBox>
          <Typography align="center" variant="h5" component="h5" gutterBottom>
            Meet the team
          </Typography>
        </GrBox>
        <GrBox>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            rowGap={10}
          >
            {teams &&
              teams.map((team, i) => (
                <React.Fragment key={i}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <img
                      src={team.picture}
                      alt={team.name}
                      style={{ height: "270px", width: "270px" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Typography variant="h4" component="h4" gutterBottom>
                      {team.name}
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                      {team.profile}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
          </Grid>
        </GrBox>
      </Container>
    </div>
  );
};

export default AboutProfile;
