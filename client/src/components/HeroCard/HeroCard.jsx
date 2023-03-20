import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import TryOutlinedIcon from "@mui/icons-material/TryOutlined";
import { Link, useNavigate } from "react-router-dom";

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();

  const heroAppreciationCount = hero?.appreciations.length;

  return (
    <>
      <Grid item xs={12} md={12}>
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
                  height: 500,
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
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sm={4} md={4} lg={4}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{
                      color: "#F6430A",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#000",
                      },
                    }}
                    onClick={() => {
                      navigate(`/hero/${hero?._id}`);
                    }}
                  >
                    {hero?.name}
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  columnGap={1}
                  item
                  sm={8}
                  md={8}
                  lg={8}
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
                </Grid>
              </Grid>

              <Typography sx={{ mt: 3 }}>{hero?.description}</Typography>
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
