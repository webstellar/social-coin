import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import {
  GrStoriesTypography,
  GrHeroTypography,
  //GrGiverTypography,
  GrItem,
} from "./GratitudeCardBig.styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import defaultImage from "../../images/dummy_post.webp";

const GratitudeCardBig = ({ gratitude }) => {
  return (
    <>
      <Grid item xs={12} md={3}>
        <CardActionArea>
          <Card sx={{ display: "block" }}>
            <Link
              to={`/appreciation/${gratitude._id}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: 150,
                  filter: "grayscale(100%)",
                  "&:hover": {
                    filter: "grayscale(0%)",
                  },
                }}
                image={gratitude?.image?.url || defaultImage}
                alt={gratitude?.summary}
              />
            </Link>
            <CardContent sx={{ flex: 1 }}>
              <Link
                to={`/appreciation/tag/${gratitude?.tags[0]}`}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#F6430A",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      color: "#F6430A",
                    },
                  }}
                >
                  {gratitude?.tags[0]}
                </Typography>
              </Link>

              <GrStoriesTypography
                variant="subtitle1"
                component="p"
                gutterBottom
              >
                {gratitude.summary.substring(0, 40)}...
              </GrStoriesTypography>

              {/*<GrGiverTypography variant="caption" color="grey.500">
                written by {gratitude.user && gratitude?.user?.name}
              </GrGiverTypography>*/}

              <GrHeroTypography variant="subtitle1" component="p" gutterBottom>
                for {gratitude?.hero?.name}
              </GrHeroTypography>

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0}
                component={Link}
                to={`/appreciation/${gratitude._id}`}
                sx={{
                  textDecoration: "none",
                }}
              >
                <GrItem elevation={0}>
                  <MenuIcon sx={{ color: "#000" }} />
                </GrItem>
                <GrItem elevation={0}>
                  <Typography
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
                    READ
                  </Typography>
                </GrItem>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

GratitudeCardBig.propTypes = {
  gratitude: PropTypes.object,
};

export default GratitudeCardBig;
