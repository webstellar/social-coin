import * as React from "react";
import HeroImage from "./../../images/writer-author.webp";
import {
  GrPaper,
  GrHeroImage,
  GrTypography,
  GrBox,
} from "./TagAppreciationHero.styles";
import { Grid, Box, Container } from "@mui/material";

const TagAppreciationHero = () => {
  
  React.useState(() => {
    const url = window.location.href;
    if (url.includes("appreciation/tag")) {
      const tagTitle = url.split("appreciation/tag")[1];
      return tagTitle;
    }
  });

  return (
    <div>
      <GrPaper
        elevation={0}
        sx={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        {
          <GrHeroImage
            style={{ display: "none" }}
            src={HeroImage}
            alt="appreciation tag"
          />
        }
        <Container maxWidth="lg">
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />

          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="baseline"
          >
            <Grid item md={6}>
              <GrBox>
                <GrTypography
                  component="h1"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                >
                  {tagTitle}
                </GrTypography>
              </GrBox>
            </Grid>
          </Grid>
        </Container>
      </GrPaper>
    </div>
  );
};

export default TagAppreciationHero;
