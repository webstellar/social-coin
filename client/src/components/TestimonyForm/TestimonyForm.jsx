import * as React from "react";
import {
  Box,
  Grid,
  Container,
  IconButton,
  Link,
  Divider,
  Fab,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material/";
import {
  GrTypography,
  GrBox,
  GrPaper,
  GrFormImage,
  GrItem,
} from "./TestimonyForm.styles";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";

//Modals
import TestimonyFormHero from "./TestimonyFormHero";
import TestimonyFormSummary from "./TestimonyFormSummary";
import TestimonyFormStory from "./TestimonyFormStory";
import TestimonyFormTags from "./TestimonyFormTags";
import TestimonyFormVideo from "./TestimonyFormVideo";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGratitude } from "../../redux/gratitudes/createGratitudeSlice";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import YoutubeEmbedForm from "../YoutubeEmbed/YoutubeEmbedForm";

import Modal from "react-modal";
import { topTagWithSelectAll, topTags } from "../../data/tags";
import defaultImage from "../../images/formbackground.jpg";

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

const TestimonyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data._id;

  const [summary, setSummary] = React.useState("");
  const [story, setStory] = React.useState("");
  const [hero, setHero] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState(["caring", "magnanimous"]);
  const [video, setVideo] = React.useState("");
  const [open, setOpen] = React.useState(false);

  //Form Modal
  const [openSummary, setOpenSummary] = React.useState(false);
  const [openStory, setOpenStory] = React.useState(false);
  const [openHero, setOpenHero] = React.useState(false);
  const [openTags, setOpenTags] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);

  const { error } = useSelector((state) => ({
    ...state.newgratitude,
  }));
  const { heroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  React.useEffect(() => {
    window.history.replaceState({}, document.title);
    dispatch(getHeroes());
    error && toast.error(error);
  }, [dispatch, error]);

  //tinymce editor
  const storyChange = (story, editor) => {
    if (editor.getContent({ format: "text" }).length < 100000) {
      setStory(story);
    }
  };

  const handleClear = () => {
    setSummary("");
    setStory("");
    setHero("");
    setImage("");
    setTags([]);
    setVideo("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(!open);
    const formData = {
      hero: data || hero,
      summary: summary,
      story: story,
      image: image,
      video: video,
      tags: tags,
    };

    dispatch(createGratitude({ formData, toast, navigate }));
    setTimeout(() => {
      handleClear();
      setOpen(open);
    }, 10000);
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

  const tinymce = "0z5qmo7cx8rjieka6xxb9nz2y1b8k8rdyluiq9zv9r0t6du2";

  const heroDisplay = heroes.filter((halo) =>
    hero === halo._id ? halo : null
  );

  return (
    <form onSubmit={onSubmit} style={{ position: "relative" }}>
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
                <GrFormImage src={image || defaultImage} alt={summary} />
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
              <Grid item xs={10} sm={10} md={10} lg={10}>
                {hero ? (
                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    sx={{ color: "#000" }}
                  >
                    {hero}
                  </Typography>
                ) : (
                  <>
                    <Typography
                      component="h3"
                      variant="h4"
                      align="center"
                      sx={{ color: "#000" }}
                      noWrap
                    >
                      Jane John Doe
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  onClick={() => {
                    setOpenHero(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="hero"
                  isOpen={openHero}
                  onRequestClose={() => {
                    setOpenHero(false);
                  }}
                  aria={{
                    labelledby: "Hero",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={customStyles}
                  contentLabel="Hero"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <TestimonyFormHero
                    heroes={heroes}
                    setOpenHero={setOpenHero}
                    hero={hero}
                    setHero={setHero}
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
            >
              <Grid item xs={10} sm={10} md={10} lg={10}>
                {summary ? (
                  <GrTypography
                    component="h1"
                    variant="h2"
                    color="grey.900"
                    align="center"
                    gutterBottom
                  >
                    {summary}
                  </GrTypography>
                ) : (
                  <>
                    <GrTypography
                      component="h1"
                      variant="h2"
                      color="grey.900"
                      align="center"
                      gutterBottom
                    >
                      Passionate testimony to him who was a hero and at the same
                      time humble
                    </GrTypography>
                  </>
                )}
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  onClick={() => {
                    setOpenSummary(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="hero"
                  isOpen={openSummary}
                  onRequestClose={() => {
                    setOpenSummary(false);
                  }}
                  aria={{
                    labelledby: "Hero",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={customStyles}
                  contentLabel="Hero"
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
                    {tags ? (
                      tags.map((tag) => (
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
                            {tag}
                          </Typography>
                        </GrItem>
                      ))
                    ) : (
                      <>
                        <GrItem elevation={0}>
                          <Link
                            href="#video"
                            color="inherit"
                            variant="body2"
                            underline="hover"
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
                              Video
                            </Typography>
                          </Link>
                        </GrItem>
                        <GrItem elevation={0}>
                          <Link
                            href="#testimony"
                            color="inherit"
                            variant="body2"
                            underline="hover"
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
                              Testimony
                            </Typography>
                          </Link>
                        </GrItem>
                      </>
                    )}
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
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
                  style={customStyles}
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
                  style={customStyles}
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
                {story ? (
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
                ) : (
                  <div style={{ fontSize: "20px", fontWeight: "400" }}>
                    It all started in the year January 2019 when I applied for
                    the role of a wordpress web designer, I was amazed to do an
                    interview with a foreigner and technically didn't know how
                    to handle the whole process, but I did to my best knowledge.
                    An experience I really don't relate to it a lot mostly
                    because the second meeting was the most heart-to-heart I
                    have ever had between a boss and an employee. I might add
                    that even though I hadn't accepted the offer yet, I already
                    saw John Jane Doe as my new boss...
                  </div>
                )}
              </Grid>
              <Grid item xs={2} md={2} sm={2}>
                <IconButton
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
                  style={customStyles}
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
      <Fab
        component={Button}
        variant="extended"
        color="secondary"
        type="submit"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <SendIcon sx={{ mr: 1 }} />
        Publish
      </Fab>
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

export default TestimonyForm;
