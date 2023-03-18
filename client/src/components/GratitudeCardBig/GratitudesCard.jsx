import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Snackbar,
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
  Collapse,
} from "@mui/material";
import {
  GrGiverTypography,
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
import CloseIcon from "@mui/icons-material/Close";

const GratitudesCard = ({ gratitude }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleCommentClick = () => {
    setOpenComment(!openComment);
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
                  height: 500,
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

              <Button
                color="secondary"
                sx={{
                  p: 0,
                  mt: 2,
                  mb: 2,
                  textTransform: "none",
                }}
                onClick={handleCommentClick}
              >
                View Comment{gratitude?.reviews?.length > 1 ? "s " : " "}
                {gratitude?.reviews?.length}
              </Button>

              <Collapse in={openComment} timeout="auto" unmountOnExit>
                {gratitude?.reviews?.length > 0 ? (
                  gratitude?.reviews.map((review) => (
                    <>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={{ mb: 1 }}
                      >
                        <Grid item sm={3} md={3} lg={3}>
                          <Typography
                            variant="body2"
                            gutterBottom
                            align="left"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "lowercase",
                            }}
                          >
                            {review.name.substring(0, 15)}..
                          </Typography>
                        </Grid>
                        <Grid item sm={9} md={9} lg={9}>
                          <Typography variant="body2" align="left" gutterBottom>
                            {review.comment}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  ))
                ) : (
                  <Typography variant="body2" gutterBottom color="inherit">
                    no comment yet, be the first
                  </Typography>
                )}
              </Collapse>

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

GratitudesCard.propTypes = {
  gratitude: PropTypes.object,
  refreshAppreciation: PropTypes.object,
};

export default GratitudesCard;
