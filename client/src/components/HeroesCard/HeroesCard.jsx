import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Stack,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  GrHeroTypography,
  GrGiverTypography,
  GrLink,
  GrItem,
} from "./HeroesCard.styles";
import TryOutlinedIcon from "@mui/icons-material/TryOutlined";
import { Link, useNavigate } from "react-router-dom";

const HeroesCard = ({ hero }) => {
  const navigate = useNavigate();

  const heroAppreciationCount = hero?.appreciations?.length;

  return (
    <>
      <Grid item xs={12} sm={12} md={3}>
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
            <CardContent sx={{ flex: 1, paddingLeft: 2, paddingRight: 2 }}>
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
                <GrItem
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {heroAppreciationCount > 0 ? (
                    <>
                      <Typography variant="subtitle1" component="p">
                        {heroAppreciationCount}
                      </Typography>
                      <Tooltip title={`${heroAppreciationCount} testimonies`}>
                        <TryOutlinedIcon sx={{ fontSize: "1.1rem" }} />
                      </Tooltip>
                    </>
                  ) : null}
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
