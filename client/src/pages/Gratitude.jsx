import { useEffect, useState, Fragment } from "react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/Seo";
import GratitudeHero from "../components/GratitudeHero/GratitudeHero";
import GratitudeSubSection from "../components/GratitudeSubSection/GratitudeSubSection";
import GratitudeMainSection from "../components/GratitudeMainSection/GratitudeMainSection";
import GratitudeCommentSection from "../components/GratitudeCommentSection/GratitudeCommentSection";

import { IconButton, Tooltip, Fab, Snackbar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getGratitude,
  reviewGratitude,
  deleteReview,
} from "../redux/gratitudes/gratitudeSlice";
import { likeGratitude } from "../redux/gratitudes/gratitudesSlice";
import { toast } from "react-toastify";

const Gratitude = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [appreciationid, setAppreciationid] = useState("");

  const { error, appreciation } = useSelector((state) => ({
    ...state.gratitude,
  }));

  const { user } = useSelector((state) => state.auth);

  const userId = user?.user?._id;
  const likes = appreciation?.likes;

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(getGratitude(id));
    setOpen(false);
  };

  const handleClear = () => {
    setComment("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      id: id,
      comment: comment,
    };
    console.log(reviewData);

    if (comment !== "") {
      dispatch(reviewGratitude(reviewData));
      handleClear();
    } else {
      toast.error("kindly add a comment");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getGratitude(id));
      setAppreciationid(id);
    }

    error && toast.error(error);
  }, [dispatch, error, id]);

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon />
        </>
      ) : (
        <>
          <FavoriteBorderIcon />
        </>
      );
    } else {
      return <FavoriteBorderIcon />;
    }
  };

  const handleLike = () => {
    dispatch(likeGratitude({ id }));
    dispatch(getGratitude(id));
    setOpen(true);
  };

  const deleteComment = (id) => {
    dispatch(deleteReview({ id, appreciationid }));
    dispatch(getGratitude(appreciationid));
  };

  /*   const deleteComment = () => {
    dispatch(deleteMyReview(id));
  };
 */
  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        REFRESH
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <Layout sx={{ position: "relative" }}>
        <GratitudeHero gratitude={appreciation} />
        <GratitudeSubSection gratitude={appreciation} />
        <GratitudeMainSection gratitude={appreciation} />
        <GratitudeCommentSection
          gratitude={appreciation}
          user={user}
          comment={comment}
          setComment={setComment}
          onSubmit={onSubmit}
          deleteComment={deleteComment}
        />
        <Tooltip title="Like this testimony">
          <Fab
            sx={{ position: "fixed", bottom: "15%", right: "5%" }}
            color="secondary"
            aria-label="add"
          >
            <IconButton
              onClick={!user?.user?._id ? null : handleLike}
              sx={{ color: "#fff" }}
            >
              <Likes />
            </IconButton>
          </Fab>
        </Tooltip>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="You liked this testimony"
          action={action}
        />

        {user && user?.user?._id === appreciation?.user?.id ? (
          <Link to={`/edit/appreciation/${id}`}>
            <Tooltip title="Edit your testimony">
              <Fab
                sx={{ position: "fixed", bottom: "5%", right: "5%" }}
                aria-label="edit"
                color="secondary"
              >
                <EditIcon />
              </Fab>
            </Tooltip>
          </Link>
        ) : null}
      </Layout>
    </>
  );
};
export default Gratitude;
