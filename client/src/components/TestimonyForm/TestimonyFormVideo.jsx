import PropTypes from "prop-types";
import TestimonyModalLayout from "./TestimonyModalLayout";
import {
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  InputLabel,
  Link,
  Divider,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const TestimonyFormVideo = ({ setVideo, video, setOpenVideo }) => {
  return (
    <TestimonyModalLayout>
      <Grid
        item
        xs={12}
        md={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10} md={10} sm={10}>
          <Typography gutterBottom={false}>
            Share your youtube video
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
              setOpenVideo(false);
            }}
          >
            <ClearIcon sx={{ fontSize: "2.0rem" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: "background.paper", mb: 2 }} />

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
      
        <TextField
          name="video"
          value={video}
          type="text"
          allowduplicates={false}
          fullWidth
          variant="standard"
          label="Drop youtube video"
          onChange={(e) => {
            setVideo(e.target.value);
          }}
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
            setOpenVideo(false);
          }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

TestimonyFormVideo.propTypes = {
  setOpenVideo: PropTypes.any,
  video: PropTypes.string,
  setVideo: PropTypes.any,
};

export default TestimonyFormVideo;
