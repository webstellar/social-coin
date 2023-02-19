import * as React from "react";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  Grid,
  Container,
  IconButton,
  InputLabel,
  Link,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Avatar,
} from "@mui/material/";
import { GrTypography, GrBox } from "./GratitudeForm.styles";
import { Editor } from "@tinymce/tinymce-react";
import ChipInput from "material-ui-chip-input";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGratitude } from "../../redux/gratitudes/createGratitudeSlice";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import GratitudeFormCard from "../GratitudeFormCard/GratitudeFormCard";

const GratitudeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data._id;
  console.log(data);

  const [summary, setSummary] = React.useState("");
  const [story, setStory] = React.useState("");
  const [hero, setHero] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState(["caring", "magnanimous"]);
  const [video, setVideo] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

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

  /*  React.useEffect(() => {
    if (hero === "" && heroes && heroes.length > 0) {
      setHero(heroes[0]._id);
    }
  }, [hero, heroes]); */

  //tinymce editor
  const storyChange = (story, editor) => {
    if (editor.getContent({ format: "text" }).length < 100000) {
      setStory(story);
    }
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (deleteTag) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
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
    console.log(formData);
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

  const tinymce = "0z5qmo7cx8rjieka6xxb9nz2y1b8k8rdyluiq9zv9r0t6du2";

  const heroDisplay = heroes.filter((halo) =>
    hero === halo._id ? halo : null
  );

  console.log(data);

  return (
    <Container maxWidth="md">
      <GrBox>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12}>
            <Box sx={{ my: 4 }}>
              <GrTypography
                variant="h5"
                component="p"
                color="grey.900"
                sx={{ textAlign: "center" }}
              >
                EXPRESS GRATITUDE FOR YOUR HUMBLE HERO
              </GrTypography>
            </Box>

            <form onSubmit={onSubmit}>
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                rowSpacing={4}
              >
                {currentStep === 1 && (
                  <>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      xs={12}
                      md={12}
                      sx={{ mt: 3, mb: 3 }}
                    >
                      {heroDisplay.map((hero) => (
                        <GratitudeFormCard key={hero?._id} hero={hero} />
                      ))}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ mt: 3, mb: 3 }}>
                      <Autocomplete
                        options={heroes}
                        autoHighlight
                        getOptionLabel={(option) => option.name || option}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > Avatar": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <Avatar
                              src={option?.profilePicture?.url}
                              alt=""
                              sx={{ width: 40, height: 40, mr: 2 }}
                            />
                            {option.name}
                          </Box>
                        )}
                        value={hero}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Find your humble hero"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "hero", // disable autocomplete and autofill
                            }}
                          />
                        )}
                        onChange={(e, value) => setHero(value?._id)}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button disabled></Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="summary"
                        value={summary}
                        type="text"
                        required
                        multiline
                        rows={1}
                        fullWidth
                        label="Give your story a title"
                        variant="standard"
                        onChange={(e) => {
                          setSummary(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel>Express your appreciation here</InputLabel>
                      <Editor
                        apiKey={tinymce}
                        initialValue="<p><i>My story about my humble hero...</i></p>"
                        value={story}
                        plugins="wordcount fullscreen"
                        init={{
                          height: 700,
                          menubar: false,
                        }}
                        onEditorChange={storyChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ChipInput
                        value={tags}
                        name="tags"
                        variant="standard"
                        placeholder="Write out qualities of your hero"
                        fullWidth
                        onAdd={(tag) => handleAddTag(tag)}
                        onDelete={(tag) => handleDeleteTag(tag)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <InputLabel>
                        <Link href="https://youtu.be/UjXTdZ45evs">
                          Tutorial
                        </Link>
                        : How to get your Youtube Video Id
                      </InputLabel>
                      <TextField
                        name="video"
                        value={video}
                        type="text"
                        allowDuplicates={false}
                        fullWidth
                        variant="standard"
                        label="Share youtube video id e.g. 75RjgtZ2tj0"
                        onChange={(e) => {
                          setVideo(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={handleNext}
                          fullWidth
                          endIcon={
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                          }
                        >
                          <GrTypography variant="h6" component="p" color="fff">
                            NEXT
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <Grid item xs={12} md={12}>
                      <Box>
                        <img
                          src={image || "https://source.unsplash.com/random"}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "10rem",
                            objectFit: "cover",
                            borderRadius: "1rem",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel>
                        Upload a banner for your testimony
                      </InputLabel>
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
                        <PhotoCamera />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        fullWidth
                      >
                        <Button
                          onClick={handlePrev}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ color: "grey.900" }}
                          fullWidth
                        >
                          <GrTypography
                            variant="p"
                            component="p"
                            color="grey.900"
                          >
                            Prev
                          </GrTypography>
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          type="submit"
                          fullWidth
                        >
                          <GrTypography variant="h5" component="p" color="#fff">
                            PUBLISH
                          </GrTypography>
                        </Button>
                      </ButtonGroup>
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
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </GrBox>
    </Container>
  );
};

export default GratitudeForm;
