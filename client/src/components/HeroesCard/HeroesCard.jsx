import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Stack,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  GrHeroTypography,
  GrGiverTypography,
  GrLink,
  GrItem,
} from "./HeroesCard.styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link, useNavigate } from "react-router-dom";

const HeroesCard = ({ hero }) => {
  const navigate = useNavigate();

  const heroAppreciationCount = hero?.appreciations.length;

  return (
    <>
      <Grid item xs={12} sm={3} md={3}>
        <CardActionArea sx={{ mb: 4 }}>
          <Card sx={{ display: "block" }}>
            <Link
              to={`/hero/${hero._id}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: 200,
                  filter: "grayscale(100%)",
                  "&:hover": {
                    filter: "grayscale(0%)",
                  },
                }}
                image={hero?.profilePicture?.url}
                alt={hero?.hero}
              />
            </Link>
            <CardContent sx={{ flex: 1, paddingLeft: 4, paddingRight: 4 }}>
              <GrGiverTypography variant="caption" color="grey.500">
                written by {hero?.user?.name || "gratitude"}
              </GrGiverTypography>

              <GrLink to={`/hero/${hero?._id}`}>
                <GrHeroTypography variant="h6" component="h6" gutterBottom>
                  for {hero?.name}
                </GrHeroTypography>
              </GrLink>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="space-between"
                spacing={0}
              >
                <GrItem
                  elevation={0}
                  onClick={() => {
                    navigate("/create-testimony", {
                      state: { data: hero?._id },
                    });
                  }}
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <Tooltip title="Create a testimony of this hero">
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
                      EXPRESS
                    </Typography>
                  </Tooltip>
                </GrItem>
                <GrItem elevation={0}>
                  <Tooltip title={`Number of likes`}>
                    <Badge
                      color="secondary"
                      badgeContent={10}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      sx={{
                        mr: 2,
                      }}
                    >
                      <FavoriteIcon />
                    </Badge>
                  </Tooltip>
                  
                  <Tooltip title={`${heroAppreciationCount} testimonies`}>
                    <Badge
                      color="secondary"
                      badgeContent={heroAppreciationCount}
                      showZero
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <ReviewsIcon />
                    </Badge>
                  </Tooltip>
                </GrItem>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

HeroesCard.propTypes = {
  hero: PropTypes.object,
};

export default HeroesCard;
