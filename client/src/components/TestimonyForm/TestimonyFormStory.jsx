import PropTypes from "prop-types";
import TestimonyModalLayout from "./TestimonyModalLayout";
import { Typography, Grid, IconButton, Button } from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import { Editor } from "@tinymce/tinymce-react";

const TestimonyFormStory = ({ story, setOpenStory, tinymce, storyChange }) => {
  return (
    <TestimonyModalLayout>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10} md={10} sm={10}>
          <Typography gutterBottom={false}>
            Express your appreciation here
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          sm={2}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <IconButton
            disableRipple={true}
            color="inherit"
            onClick={() => {
              setOpenStory(false);
            }}
          >
            <ClearIcon sx={{ fontSize: "2.0rem" }} />
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
        justifyContent="space-between"
        alignItems="center"
      >
        <Editor
          apiKey={tinymce}
          initialValue={"<p><i>My story about my humble hero...</i></p>"}
          value={story}
          plugins="wordcount fullscreen"
          init={{
            height: 600,
            width: "100%",
            menubar: false,
          }}
          onEditorChange={storyChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenStory(false);
          }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

TestimonyFormStory.propTypes = {
  storyChange: PropTypes.any,
  setOpenStory: PropTypes.any,
  tinymce: PropTypes.string,
  story: PropTypes.string,
};

export default TestimonyFormStory;
