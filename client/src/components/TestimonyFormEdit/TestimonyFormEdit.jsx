import * as React from "react";
import {
  Box,
  Grid,
  Container,
  IconButton,
  Divider,
  Fab,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import {
  GrTagTypography,
  GrTypography,
  GrBox,
  GrPaper,
  GrFormImage,
  GrItem,
} from "./TestimonyFormEdit.styles";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";

//Modals
import TestimonyFormSummary from "../TestimonyForm/TestimonyFormSummary";
import TestimonyFormStory from "../TestimonyForm/TestimonyFormStory";
import TestimonyFormTags from "../TestimonyForm/TestimonyFormTags";
import TestimonyFormVideo from "../TestimonyForm/TestimonyFormVideo";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getGratitude } from "../../redux/gratitudes/gratitudeSlice";
import { editGratitude } from "../../redux/gratitudes/createGratitudeSlice";
import YoutubeEmbedForm from "../YoutubeEmbed/YoutubeEmbedForm";

import Modal from "react-modal";
import { topTagWithSelectAll, topTags } from "../../data/tags";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "560px",
    overflow: "unset",
    WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
  },
};

const customMobileStyles = {
  content: {
    top: "50%",
    left: "57%",
    right: "auto",
    bottom: "auto",
    width: "320px",
    overflow: "unset",
    WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
  },
};

const TestimonyFormEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [summary, setSummary] = React.useState("");
  const [story, setStory] = React.useState("");
  const [hero, setHero] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState([""]);
  const [video, setVideo] = React.useState("");
  const [open, setOpen] = React.useState(false);

  //Form Modal
  const [openSummary, setOpenSummary] = React.useState(false);
  const [openStory, setOpenStory] = React.useState(false);
  const [openTags, setOpenTags] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);

  const { error, appreciation } = useSelector((state) => ({
    ...state.gratitude,
  }));
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (id) {
      dispatch(getGratitude(id));
    }
    error && toast.error(error);
  }, [dispatch, id, error]);

  React.useEffect(() => {
    if (appreciation) {
      setHero(appreciation?.hero?.name);
      setSummary(appreciation?.summary);
      setStory(appreciation?.story);
      setImage(appreciation?.image?.url);
      setTags(appreciation?.tags);
      setVideo(appreciation?.video);
    }
  }, [appreciation]);

  //tinymce editor
  const storyChange = (story, editor) => {
    if (editor.getContent({ format: "text" }).length < 100000) {
      setStory(story);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(!open);

    let formData = {};

    if (image.includes("http://res.cloudinary.com")) {
      formData = {
        summary: summary,
        story: story,
        video: video,
        tags: tags,
      };
    } else {
      formData = {
        summary: summary,
        story: story,
        image: image,
        video: video,
        tags: tags,
      };
    }

    if (user?.user?._id === appreciation?.user?.id) {
      dispatch(editGratitude({ id, formData, toast, navigate }));
      setTimeout(() => {
        setOpen(open);
      }, 10000);
    } else {
      toast.error("Sorry you do not have permission to edit this testimony");
      setOpen(!open);
    }
  };

  //images
  const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      const file = e.target.files[0];
      if (file > 8e6) {
        alert("Max Limit is: 8mb");
        return;
      }
      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (e, newValue) => {
    const isSelectAll = newValue.findIndex((v) => v.isSelectAll) > -1;
    if (isSelectAll) {
      setTags([...topTags]);
    } else {
      setTags(newValue);
    }
  };

  const tinymce = process.env.REACT_APP_TINY_URL_KEY;

  console.log(image);

  return (
    <form onSubmit={onSubmit} style={{ position: "relative" }}>
      {user?.user?._id !== appreciation?.user?.id ? (
        <Container maxWidth="lg">
          <Typography
            align="center"
            variant="h6"
            component="h6"
            sx={{
              color: "#fff",
              backgroundColor: "#f54242",
              padding: 2,
              marginBottom: 5,
            }}
          >
            Sorry you do not have permission to edit this testimony
          </Typography>
        </Container>
      ) : null}

      <GrPaper elevation={0}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <GrFormImage src={image} alt={summary} />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  variant="contained"
                  component="label"
                  color="secondary"
                >
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    name="image"
                    onChange={onChange}
                    disabled={
                      user?.user?._id !== appreciation?.user?.id ? true : false
                    }
                  />
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Divider sx={{ bgcolor: "background.paper", mt: 1, mb: 1 }} />

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs={10} sm={10} md={10} lg={10} sx={{ mb: 3 }}>
                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  sx={{ color: "#000" }}
                >
                  {hero}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton disabled>
                  <EditIcon fontSize="medium" sx={{ color: "#e0e0e0" }} />
                </IconButton>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <GrTypography
                  component="h1"
                  variant="h2"
                  color="grey.900"
                  align="center"
                  gutterBottom
                >
                  {summary}
                </GrTypography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  disabled={
                    user?.user?._id !== appreciation?.user?.id ? true : false
                  }
                  onClick={() => {
                    setOpenSummary(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="summary"
                  isOpen={openSummary}
                  onRequestClose={() => {
                    setOpenSummary(false);
                  }}
                  aria={{
                    labelledby: "Summary",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={isMobile ? customMobileStyles : customStyles}
                  contentLabel="Summary"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <TestimonyFormSummary
                    summary={summary}
                    setOpenSummary={setOpenSummary}
                    setSummary={setSummary}
                  />
                </Modal>
              </Grid>
            </Grid>

            <Divider sx={{ bgcolor: "background.paper", mt: 1, mb: 1 }} />

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <span style={{ color: "#000", fontSize: "1.2rem" }}>
                      tag:{" "}
                    </span>
                    {tags
                      ? tags.map((tag) => (
                          <GrItem elevation={0} key={tag}>
                            <GrTagTypography
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
                              {tag}
                            </GrTagTypography>
                          </GrItem>
                        ))
                      : null}
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  disabled={
                    user?.user?._id !== appreciation?.user?.id ? true : false
                  }
                  onClick={() => {
                    setOpenTags(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="hero"
                  isOpen={openTags}
                  onRequestClose={() => {
                    setOpenTags(false);
                  }}
                  aria={{
                    labelledby: "Hero",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={isMobile ? customMobileStyles : customStyles}
                  contentLabel="Story"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <TestimonyFormTags
                    tags={tags}
                    setOpenTags={setOpenTags}
                    handleTagChange={handleTagChange}
                    topTags={topTags}
                    topTagWithSelectAll={topTagWithSelectAll}
                  />
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </GrPaper>

      <section>
        <GrBox>
          <Container maxWidth="lg">
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={10} md={10} sm={10}>
                <div id="video">
                  <Container maxWidth="md">
                    <YoutubeEmbedForm video={video} summary={summary} />
                  </Container>
                </div>
              </Grid>

              <Grid item xs={2} md={2} sm={2}>
                <IconButton
                  disabled={
                    user?.user?._id !== appreciation?.user?.id ? true : false
                  }
                  onClick={() => {
                    setOpenVideo(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>

                <Modal
                  id="hero"
                  isOpen={openVideo}
                  onRequestClose={() => {
                    setOpenVideo(false);
                  }}
                  aria={{
                    labelledby: "Story",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={isMobile ? customMobileStyles : customStyles}
                  contentLabel="Hero"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <TestimonyFormVideo
                    setOpenVideo={setOpenVideo}
                    video={video}
                    setVideo={setVideo}
                  />
                </Modal>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
              sx={{ mt: 4, mb: 4 }}
            >
              <Grid item xs={10} md={10} sm={10}>
                <div
                  id="testimony"
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  dangerouslySetInnerHTML={{ __html: story }}
                />
              </Grid>
              <Grid item xs={2} md={2} sm={2}>
                <IconButton
                  disabled={
                    user?.user?._id !== appreciation?.user?.id ? true : false
                  }
                  onClick={() => {
                    setOpenStory(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="hero"
                  isOpen={openStory}
                  onRequestClose={() => {
                    setOpenStory(false);
                  }}
                  aria={{
                    labelledby: "Story",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={isMobile ? customMobileStyles : customStyles}
                  contentLabel="Hero"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <TestimonyFormStory
                    story={story}
                    setOpenStory={setOpenStory}
                    storyChange={storyChange}
                    tinymce={tinymce}
                  />
                </Modal>
              </Grid>
            </Grid>
          </Container>
        </GrBox>
      </section>
      {user?.user?._id === appreciation?.user?.id ? (
        <Fab
          component={Button}
          variant="extended"
          color="secondary"
          type="submit"
          sx={{ position: "absolute", bottom: 16, right: 32 }}
        >
          <SendIcon sx={{ mr: 1 }} />
          Publish
        </Fab>
      ) : (
        <Container maxWidth="lg">
          <Typography
            align="center"
            variant="h6"
            component="h6"
            sx={{
              color: "#fff",
              backgroundColor: "#f54242",
              padding: 2,
            }}
          >
            Sorry you do not have permission to edit this testimony
          </Typography>
        </Container>
      )}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default TestimonyFormEdit;
