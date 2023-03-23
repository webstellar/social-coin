import * as React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Stack,
  Button,
  Avatar,
  Tooltip,
  Snackbar,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CardActionArea,
} from "@mui/material";
import {
  GrStoriesTypography,
  GrGiverTypography,
  GrHeroTypography,
  GrItem,
} from "./GratitudeCardBig.styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../images/dummy_post.webp";
import { likeGratitude } from "../../redux/gratitudes/gratitudesSlice";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CloseIcon from "@mui/icons-material/Close";

const GratitudeCardBig = ({ gratitude }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

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
          title={`${likes.length} person liked this testimony`}
          placement="bottom"
        >
          <Typography>
            {likes.length} Like{likes.length > 1 ? "s" : ""}
          </Typography>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Be the first to like this post" placement="bottom">
          <Typography>
            {likes.length} Like{likes.length > 1 ? "s" : ""}
          </Typography>
        </Tooltip>
      );
    }
  };

  const handleLike = () => {
    dispatch(likeGratitude({ id }));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          navigate("/login");
        }}
      >
        LOGIN
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
                  height: 200,
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
                </GrItem>

                <GrItem elevation={0}>
                  <IconButton onClick={!userId ? handleClick : handleLike}>
                    <Likes />
                  </IconButton>
                </GrItem>
              </Stack>
              <GrStoriesTypography
                variant="p"
                component="h2"
                onClick={() => {
                  navigate(`/appreciation/${gratitude._id}`);
                }}
              >
                {gratitude.summary.substring(0, 50)}...
              </GrStoriesTypography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <GrItem elevation={0}>
                  <GrGiverTypography variant="caption" color="grey.500">
                    by {gratitude?.user ? gratitude?.user?.name : "unknown"}
                  </GrGiverTypography>
                </GrItem>
                <GrItem elevation={0}>
                  <LikesCount />
                </GrItem>
              </Stack>

              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Please login to like this testimony"
                action={action}
              />
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
};

GratitudeCardBig.propTypes = {
  gratitude: PropTypes.object,
  refreshAppreciation: PropTypes.object,
};

export default GratitudeCardBig;
