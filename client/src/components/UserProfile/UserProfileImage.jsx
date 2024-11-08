import PropTypes from "prop-types";
import { Typography, Grid, IconButton, Button, Divider } from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import TestimonyModalLayout from "./../TestimonyForm/TestimonyModalLayout";
import FileBase from "react-file-base64";

const UserProfileImage = ({ setOpenImage, onChange, handleProfilePicture }) => {
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
            Upload an image to change profile
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
              setOpenImage(false);
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
        <FileBase type="file" multiple={false} onDone={onChange} />
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
          type="submit"
          onClick={handleProfilePicture}
          sx={{ mt: 3 }}
        >
          Save
        </Button>
      </Grid>
    </TestimonyModalLayout>
  );
};

UserProfileImage.propTypes = {
  setOpenImage: PropTypes.any,
  onChange: PropTypes.func,
  handleProfilePicture: PropTypes.func,
};

export default UserProfileImage;
