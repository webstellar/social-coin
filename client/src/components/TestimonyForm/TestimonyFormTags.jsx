import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  CssBaseline,
  Autocomplete,
  Divider,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

const TestimonyFormTags = ({ tags, topTags, setOpenTags, handleTagChange }) => {
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
                Write out qualities of your hero
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
                  setOpenTags(false);
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
            <Autocomplete
              freeSolo
              multiple
              fullWidth
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
                setOpenTags(false);
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

TestimonyFormTags.propTypes = {
  handleTagChange: PropTypes.any,
  setOpenTags: PropTypes.any,
  tags: PropTypes.array,
  topTagWithSelectAll: PropTypes.array,
  topTags: PropTypes.array,
};

export default TestimonyFormTags;
