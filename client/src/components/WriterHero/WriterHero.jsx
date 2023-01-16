import PropTypes from "prop-types";
import {
  GrDiv,
  GrPaper,
  GrHeroImage,
  GrTypography,
  GrBox,
  GrParaBox,
} from "./WriterHero.styles";
import HeroImage from "./../../images/writer-author.webp";
import { Grid, Box, Container } from "@mui/material";
import GratitudeCardBig from "../GratitudeCardBig/GratitudeCardBig";

const WriterHero = ({ hero }) => {
  return (
    <div>
      <GrPaper
        elevation={0}
        sx={{
          backgroundImage: `url(${hero?.profilePicture?.url || HeroImage})`,
        }}
      >
        {
          <GrHeroImage
            style={{ display: "none" }}
            src={hero?.profilePicture?.url || HeroImage}
            alt="hero"
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
                  {hero?.name}
                </GrTypography>
              </GrBox>
            </Grid>
          </Grid>
        </Container>
      </GrPaper>
      <Container maxWidth="lg">
        <GrParaBox>
          <div
            style={{ fontSize: "20px", fontWeight: "300" }}
            dangerouslySetInnerHTML={{ __html: hero?.description }}
          />
        </GrParaBox>
      </Container>
      <Container maxWidth="lg">
        <GrParaBox>
          <GrDiv>
            <Grid container spacing={4}>
              {hero &&
                hero?.appreciations?.map((appreciation) => (
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

WriterHero.propTypes = {
  hero: PropTypes.object,
};

export default WriterHero;
