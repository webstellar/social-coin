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
} from "@mui/material";
import { GrItem } from "./HeroCard.styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeGratitude } from "../../redux/gratitudes/gratitudesSlice";

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.user?._id;

  const heroAppreciationCount = hero?.appreciations.length;

  const handleLikes = () => {
    dispatch(likeGratitude({ userId }));
  };

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
                  <Badge
                    color="secondary"
                    badgeContent={10}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    sx={{
                      mr: 4,
                    }}
                    onClick={handleLikes}
                  >
                    <FavoriteIcon />
                  </Badge>
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
