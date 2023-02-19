import { GrPaper, GrHeroImage, GrTypography, GrBox } from "./AboutHero.styles";
import HeroImage from "./../../images/sample5.jpg";
import { Grid, Box, Container } from "@mui/material";

const AboutHero = () => {
  return (
    <>
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
            alt="gratitude"
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
          <Grid container justifyContent="flex-end">
            <Grid item md={8}>
              <GrBox>
                <GrTypography
                  component="p"
                  variant="h4"
                  color="inherit"
                  gutterBottom
                  sx={{ mb: 8 }}
                >
                  “At times, our own light goes out and is rekindled by a spark
                  from another person. Each of us has cause to think with deep
                  gratitude of those who have lighted the flame within us.”
                </GrTypography>
                <GrTypography component="p" variant="h4" color="inherit">
                  - Albert Schweitzer
                </GrTypography>
              </GrBox>
            </Grid>
          </Grid>
        </Container>
      </GrPaper>
    </>
  );
};

export default AboutHero;
