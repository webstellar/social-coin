import { GrPaper, GrTypography, GrBox } from "./GratitudeHero.styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Grid, CardMedia, Card, Container } from "@mui/material";
import defaultImage from "../../images/dummy_post.webp";

const GratitudeHero = ({ gratitude }) => {
  return (
    <>
      <GrPaper elevation={0}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ display: "flex", borderRadius: 3, mt: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "50%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                    "&:hover": {
                      filter: "grayscale(0%)",
                    },
                  }}
                  image={gratitude?.image?.url || defaultImage}
                  alt={gratitude?.summary}
                />
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <GrBox>
                <Link
                  to={`/hero/${gratitude?.hero?._id}`}
                  style={{ color: "#f6430a", textDecoration: "none" }}
                >
                  <Typography
                    component="h2"
                    variant="h3"
                    align="center"
                    gutterBottom
                  >
                    {gratitude?.hero?.name}
                  </Typography>
                </Link>

                <GrTypography
                  component="h1"
                  variant="h2"
                  color="grey.900"
                  align="center"
                  gutterBottom
                >
                  {gratitude?.summary}
                </GrTypography>

                <Link
                  to="#"
                  style={{ color: "grey.900", textDecoration: "none" }}
                >
                  <Typography component="p" align="center">
                    by{" "}
                    <strong>{gratitude.user && gratitude?.user?.name}</strong>
                  </Typography>
                </Link>
              </GrBox>
            </Grid>
          </Grid>
        </Container>
      </GrPaper>
    </>
  );
};

GratitudeHero.propTypes = {
  gratitude: PropTypes.object,
};

export default GratitudeHero;
