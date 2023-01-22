import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  CssBaseline,
  Autocomplete,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": {
    m: 1,
    width: "25ch",
  },
};

const TestimonyFormTags = ({
  tags,
  topTags,
  setOpenTags,
  handleTagChange,
  topTagWithSelectAll,
}) => {
  return (
    <>
      <CssBaseline />
      <Box sx={style}>
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
                Give your story a title
              </Typography>
            </Grid>
            <Grid item xs={2} md={2} sm={2}>
              <IconButton
                disableRipple={true}
                color="inherit"
                onClick={() => {
                  setOpenTags(false);
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
            <Autocomplete
              freeSolo
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={topTags}
              value={tags}
              onChange={handleTagChange}
              renderInput={(params) => (
                <TextField {...params} label="tags" placeholder="Favorites" />
              )}
              sx={{ width: "500px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

TestimonyFormTags.propTypes = {
  handleTagChange: PropTypes.any,
  setOpenTags: PropTypes.any,
  tags: PropTypes.array,
  topTagWithSelectAll: PropTypes.array,
  topTags: PropTypes.array,
};

export default TestimonyFormTags;
