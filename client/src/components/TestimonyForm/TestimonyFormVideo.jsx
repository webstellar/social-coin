import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  CssBaseline,
  InputLabel,
  Link,
  Divider
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const TestimonyFormVideo = ({ setVideo, video, setOpenVideo }) => {
  return (
    <>
      <CssBaseline />
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          rowSpacing={1}
        >
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
                Share youtube video id e.g. 75RjgtZ2tj0
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
            <InputLabel>
              <Link href="https://youtu.be/UjXTdZ45evs">Tutorial</Link>: How to
              get your Youtube Video Id
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

          <Grid
            item
            xs={12}
            md={12}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
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
        </Grid>
      </Box>
    </>
  );
};

TestimonyFormVideo.propTypes = {
  setOpenVideo: PropTypes.any,
  video: PropTypes.string,
  setVideo: PropTypes.any,
};

export default TestimonyFormVideo;
