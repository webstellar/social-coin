import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Button,
  Stack,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  GrHeroTypography,
  GrGiverTypography,
  GrLink,
  GrItem,
} from "./HeroCard.styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item xs={12} md={3}>
        <CardActionArea>
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
            <CardContent sx={{ flex: 1 }}>
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
                justifyContent="flex-start"
                alignItems="center"
                spacing={0}
                onClick={() => {
                  navigate("/create-testimony", {
                    state: { data: hero?._id },
                  });
                }}
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
                    EXPRESS
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

HeroCard.propTypes = {
  hero: PropTypes.object,
};

export default HeroCard;
