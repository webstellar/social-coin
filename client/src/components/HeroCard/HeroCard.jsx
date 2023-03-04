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
import { GrItem } from "./HeroCard.styles";
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="space-between"
                spacing={0}
              >
                <GrItem
                  elevation={0}
                  onClick={() => {
                    navigate(`/hero/${hero?._id}`);
                  }}
                  sx={{
                    textDecoration: "none",
                  }}
                >
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
                    {hero?.name}
                  </Typography>
                </GrItem>
                <GrItem elevation={0}>
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
