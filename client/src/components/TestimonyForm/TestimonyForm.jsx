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
  GrTypography,
  GrTagTypography,
  GrBigTypography,
  GrBox,
  GrPaper,
  GrFormImage,
  GrItem,
} from "./TestimonyForm.styles";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";

//Modals
import TestimonyFormSummary from "./TestimonyFormSummary";
import TestimonyFormStory from "./TestimonyFormStory";
import TestimonyFormTags from "./TestimonyFormTags";
import TestimonyFormVideo from "./TestimonyFormVideo";
import TestimonyFormCategory from "./TestimonyFormCategory";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGratitude } from "../../redux/gratitudes/createGratitudeSlice";
import { getAllHeroes } from "../../redux/heroes/heroesSlice";
import YoutubeEmbedForm from "../YoutubeEmbed/YoutubeEmbedForm";

import Modal from "react-modal";

import { useDropzone } from "react-dropzone";

import { topTagWithSelectAll, topTags } from "../../data/tags";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

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

const TestimonyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const data = location.state?.data;

  const [summary, setSummary] = React.useState("");
  const [story, setStory] = React.useState("");
  const [hero, setHero] = React.useState("");
  const [fakeName, setFakeName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState(["caring", "magnanimous"]);
  const [categories, setCategories] = React.useState([]);
  const [video, setVideo] = React.useState("");
  const [open, setOpen] = React.useState(false);

  //Form Modal
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openSummary, setOpenSummary] = React.useState(false);
  const [openStory, setOpenStory] = React.useState(false);
  const [openTags, setOpenTags] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles) => {
    const reader = new FileReader();
    const file = acceptedFiles[0];
    if (file > 8e6) {
      alert("Max Limit is: 8mb");
      return;
    }
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: "image/*",
  });

  const { error } = useSelector((state) => ({
    ...state.newgratitude,
  }));

  const { allHeroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  React.useEffect(() => {
    if (data) {
      setHero(data);
    }
  }, [data]);

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
    setCategories([]);
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
      categories: categories,
    };

    if (hero && summary && story && image) {
      dispatch(createGratitude({ formData, toast, navigate }));
      setTimeout(() => {
        handleClear();
        setOpen(open);
      }, 10000);
    } else {
      toast.error("Fill all required fields");
      setOpen(!open);
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

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const tinymce = process.env.REACT_APP_TINY_URL_KEY;

  React.useEffect(() => {
    dispatch(getAllHeroes());
    error && toast.error(error);
  }, [dispatch, error]);

  const heroNameDisplay = allHeroes.filter((halo) =>
    data === halo._id ? halo : null
  );

  const { current: myArray } = React.useRef(heroNameDisplay);

  React.useEffect(() => {
    setFakeName(myArray[0]?.name);
  }, [myArray]);

  const handleImageClear = () => {
    setImage("");
  };

  return (
    <form onSubmit={onSubmit} style={{ position: "relative" }}>
      <Box sx={{ my: 4, mb: 5 }}></Box>
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
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <GrBigTypography variant="h3" component="h2" color="grey.900">
                  STEP 2: WRITE YOUR TESTIMONY
                </GrBigTypography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {!image ? (
                  <>
                    <Typography
                      variant="p"
                      component="p"
                      gutterBottom
                      color="secondary"
                    >
                      Upload Your Testimony Banner
                    </Typography>
                    <div
                      {...getRootProps()}
                      style={{
                        border: "5px dotted black",
                        padding: "80px 60px 80px 60px",
                        backgroundColor: "#dcdcdc",
                        color: "#000",
                        marginBottom: "4rem",
                      }}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the image here ...</p>
                      ) : (
                        <>
                          <p>
                            Drag 'n' drop an image here, or click to select
                            files
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <CloudUploadIcon sx={{ fontSize: "3rem" }} />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : null}

                <GrFormImage src={image} alt={summary} />
              </Grid>

              <Grid item xs={2} sm={2} md={2} lg={2}>
                {image ? (
                  <IconButton
                    variant="contained"
                    component="label"
                    color="secondary"
                    onClick={handleImageClear}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
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
                {fakeName ? (
                  <>
                    <Typography
                      component="h3"
                      variant="h4"
                      align="center"
                      sx={{ color: "#000" }}
                    >
                      {fakeName}
                    </Typography>
                    <Link to="/create-hero" style={{ textAlign: "center" }}>
                      <Typography align="center">
                        Not your hero? click here to go back
                      </Typography>
                    </Link>
                  </>
                ) : (
                  <>
                    <Typography
                      component="h3"
                      variant="h4"
                      align="center"
                      sx={{ color: "#f44336" }}
                    >
                      {heroNameDisplay[0]?.name}
                    </Typography>
                    <Link to="/create-hero" style={{ textAlign: "center" }}>
                      <Typography align="center">
                        Click here to create your hero
                      </Typography>
                    </Link>
                  </>
                )}
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton disabled={data ? true : false}>
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
                      Write the title of your testimony...
                      <span style={{ color: "#f44336" }}>*</span>
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
                  <div style={{ fontSize: "3rem", fontWeight: "400" }}>
                    Write your testimony hero here...
                    <span style={{ color: "#f44336" }}>*</span>
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
                      categories:{" "}
                    </span>
                    {categories
                      ? categories.map((category) => (
                          <GrItem elevation={0} key={category}>
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
                              {category}
                            </GrTagTypography>
                          </GrItem>
                        ))
                      : null}
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <IconButton
                  onClick={() => {
                    setOpenCategory(true);
                  }}
                >
                  <EditIcon fontSize="medium" color="secondary" />
                </IconButton>
                <Modal
                  id="hero"
                  isOpen={openCategory}
                  onRequestClose={() => {
                    setOpenCategory(false);
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
                  <TestimonyFormCategory
                    setOpenCategory={setOpenCategory}
                    handleCategoryChange={handleCategoryChange}
                    category={categories}
                  />
                </Modal>
              </Grid>
            </Grid>
          </Container>
        </GrBox>
      </section>

      <Container maxWidth="lg">
        <Fab
          component={Button}
          variant="extended"
          color="secondary"
          type="submit"
          align="center"
          sx={{
            align: "center",
          }}
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
      </Container>
    </form>
  );
};

export default TestimonyForm;
