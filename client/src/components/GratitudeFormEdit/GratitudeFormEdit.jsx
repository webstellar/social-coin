import * as React from "react";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  Grid,
  Container,
  InputLabel,
  Link,
  Typography,
} from "@mui/material/";
import { GrTypography, GrBox } from "./GratitudeFormEdit.styles";
import { Editor } from "@tinymce/tinymce-react";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getGratitude } from "../../redux/gratitudes/gratitudeSlice";
import { editGratitude } from "../../redux/gratitudes/createGratitudeSlice";

const GratitudeFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [summary, setSummary] = React.useState("");
  const [story, setStory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState();
  const [video, setVideo] = React.useState("");

  const { error, loading, appreciation } = useSelector((state) => ({
    ...state.gratitude,
  }));

  React.useEffect(() => {
    if (id) {
      dispatch(getGratitude(id));
    }
    error && toast.error(error);
  }, [dispatch, id, error]);

  React.useEffect(() => {
    if (appreciation) {
      setSummary(appreciation?.summary);
      setStory(appreciation?.story);
      setImage(appreciation?.image);
      setTags(appreciation?.tags);
      setVideo(appreciation?.video);
    }
  }, [appreciation]);

  //tinymce editor
  const storyChange = (story, editor) => {
    if (editor.getContent({ format: "text" }).length < 2000) {
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
    setImage("");
    setTags([]);
    setVideo("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      summary: summary,
      story: story,
      image: image,
      video: video,
      tags: tags,
    };
    dispatch(editGratitude({ id, formData, toast, navigate }));
    setTimeout(handleClear(), 5000);
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

  return (
    <Container maxWidth="xl">
      <GrBox>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ my: 4 }}>
              <GrTypography variant="h5" component="p" color="grey.900">
                EDIT YOUR HERO&apos;S GRATITUDE
              </GrTypography>
            </Box>

            <form onSubmit={onSubmit}>
              <Grid
                item
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="stretch"
                rowSpacing={4}
              >
                <Grid item xs={12} md={12}>
                  <Typography sx={{ color: "#000" }}>
                    {appreciation?.hero?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel>Edit your summary</InputLabel>
                  <TextField
                    name="summary"
                    value={summary}
                    type="text"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => {
                      setSummary(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel>Express your appreciation here</InputLabel>
                  <Editor
                    apiKey={tinymce}
                    value={story}
                    plugins="wordcount fullscreen"
                    init={{
                      height: 500,
                      menubar: false,
                    }}
                    onEditorChange={storyChange}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <ChipInput
                    value={tags}
                    name="tags"
                    variant="outlined"
                    placeholder="Write out qualities of your hero"
                    fullWidth
                    onAdd={(tag) => handleAddTag(tag)}
                    onDelete={(tag) => handleDeleteTag(tag)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel>
                    Share youtube video id:
                    <Link href="https://youtu.be/UjXTdZ45evs">Tutorial</Link>:
                    How to get your Youtube Video Id
                  </InputLabel>
                  <TextField
                    name="video"
                    value={video}
                    type="text"
                    allowDuplicates={false}
                    fullWidth
                    onChange={(e) => {
                      setVideo(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel>Upload a banner for your hero</InputLabel>
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                  >
                    Upload a banner for your hero
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      name="image"
                      onChange={onChange}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                  <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                    fullWidth
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      <GrTypography variant="h6" component="p" color="grey.900">
                        EXPRESS
                      </GrTypography>
                    </Button>
                    <Button onClick={handleClear} fullWidth>
                      <GrTypography variant="p" component="p" color="grey.900">
                        Clear
                      </GrTypography>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </GrBox>
    </Container>
  );
};

export default GratitudeFormEdit;
