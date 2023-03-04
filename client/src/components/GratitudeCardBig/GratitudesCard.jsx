import * as React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  GrStoriesTypography,
  GrHeroTypography,
  GrItem,
} from "./GratitudeCardBig.styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/dummy_post.webp";
import { likeGratitude } from "../../redux/gratitudes/gratitudesSlice";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const GratitudesCard = ({ gratitude, currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const id = gratitude?._id;
  const userId = user?.user?._id;
  const likes = gratitude?.likes;

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon color="secondary" />
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon />
        </>
      );
    } else {
      return <ThumbUpAltOutlinedIcon />;
    }
  };

  const LikesCount = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <Tooltip
          title={`You  ${
            likes.length === 1 ? "" : `and  ${likes.length - 1} others`
          } liked this testimony`}
          placement="bottom"
        >
          <Typography>
            {likes.length} Like{likes.length > 1 ? "s" : ""}
          </Typography>
        </Tooltip>
      ) : (
        <Tooltip
          title={`${likes.length} liked this testimony`}
          placement="bottom"
        >
          <Typography>{likes.length} Likes</Typography>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Be the first to like this post" placement="bottom">
          <Typography>{likes.length} Likes</Typography>
        </Tooltip>
      );
    }
  };

  const handleLike = () => {
    dispatch(likeGratitude({ id }));
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={{ mb: 5 }}>
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
                  height: 300,
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <GrItem elevation={0}>
                  <IconButton onClick={!userId ? null : handleLike}>
                    <Likes />
                  </IconButton>
                </GrItem>
                <GrItem elevation={0}>
                  <LikesCount />
                </GrItem>
              </Stack>

              <GrStoriesTypography variant="p" component="h2">
                {gratitude.summary.substring(0, 30)}...
              </GrStoriesTypography>
              {/*<GrGiverTypography variant="caption" color="grey.500">
                written by {gratitude.user && gratitude?.user?.name}
              </GrGiverTypography>*/}
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                onClick={() => {
                  navigate(`/hero/${gratitude?.hero?.id}`);
                }}
              >
                <GrItem elevation={0}>
                  <Avatar
                    alt={gratitude?.hero?.name}
                    src={gratitude?.hero?.profilePicture}
                    sx={{ width: 24, height: 24 }}
                  />
                </GrItem>

                <GrItem elevation={0}>
                  <GrHeroTypography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                  >
                    {gratitude?.hero?.name}
                  </GrHeroTypography>
                </GrItem>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

GratitudesCard.propTypes = {
  gratitude: PropTypes.object,
  refreshAppreciation: PropTypes.object,
};

export default GratitudesCard;
