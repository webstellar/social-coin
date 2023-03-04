import {
  GrPaper,
  GrTypography,
  GrBox,
  GrItem,
  GrTagTypography,
} from "./GratitudeHero.styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  CardMedia,
  Card,
  Container,
  Box,
  Stack,
} from "@mui/material";
import defaultImage from "../../images/testimonybanner.png";

const GratitudeHero = ({ gratitude }) => {
  const likes = gratitude?.likes;
  const LikesCount = likes?.length;

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
                  to={`/hero/${gratitude?.hero?.id}`}
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

                {LikesCount > 0 ? (
                  <Typography
                    variant="subtitle1"
                    component="p"
                    align="center"
                    sx={{
                      color: "#000",
                      mt: 1,
                    }}
                  >
                    {LikesCount} Likes
                  </Typography>
                ) : null}
              </GrBox>
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <span style={{ color: "#000", fontSize: "1.2rem" }}>
                    tag:
                  </span>
                  {gratitude?.tags
                    ? gratitude?.tags.map((tag) => (
                        <GrItem elevation={0} key={tag}>
                          <Link
                            to={`/appreciation/tag/${tag}`}
                            sx={{ textDecoration: "none" }}
                          >
                            <GrTagTypography
                              variant="subtitle1"
                              component="p"
                              sx={{
                                color: "#000",
                                textDecoration: "none",
                                "&:hover": {
                                  color: "#F6430A",
                                },
                              }}
                            >
                              {tag}
                            </GrTagTypography>
                          </Link>
                        </GrItem>
                      ))
                    : null}
                </Stack>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <span style={{ color: "#000", fontSize: "1.2rem" }}>
                    categories:
                  </span>
                  {gratitude?.categories
                    ? gratitude?.categories.map((category) => (
                        <GrItem elevation={0} key={category}>
                          <Link
                            to={`/appreciation/categories/${category}`}
                            sx={{ textDecoration: "none" }}
                          >
                            <GrTagTypography
                              variant="subtitle1"
                              component="p"
                              sx={{
                                color: "#000",
                                textDecoration: "none",
                                "&:hover": {
                                  color: "#F6430A",
                                },
                              }}
                            >
                              {category}
                            </GrTagTypography>
                          </Link>
                        </GrItem>
                      ))
                    : null}
                </Stack>
              </Box>
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
