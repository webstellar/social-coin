import * as React from "react";
import {
  Container,
  Stack,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  GrBox,
  GrItem,
  GrBigTypography,
  GrLink,
  GrImageButton,
  GrImage,
  GrImageSrc,
  GrImageBackdrop,
} from "./UserProfile.styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Modal from "react-modal";
import UserProfileImage from "./UserProfileImage";

import { updateProfile, loadUser } from "../../redux/auth/myAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    overflow: "unset",
    WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
  },
};

const UserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.me);
  const username = user?.user?.name;
  const firstname = username.split(" ")[0];

  const [profilePicture, setProfilePicture] = React.useState("");
  const [openImage, setOpenImage] = React.useState(false);

  const handleChange = (profilePicture) => {
    setProfilePicture(profilePicture);
  };

  React.useEffect(() => {
    dispatch(loadUser());
    error && toast.error(error);
  }, [dispatch, error]);

  const handleProfilePicture = (e) => {
    e.preventDefault();
    setOpenImage(false);
    const formData = {
      profilePicture: profilePicture,
    };
    dispatch(updateProfile({ formData, toast, navigate }));
  };

  return (
    <Container maxWidth="lg">
      <GrBox>
        <Grid
          container
          direction="row"
          justifyContent={isMobile ? "space-between" : "flex-start"}
          alignItems="center"
          spacing={2}
        >
          <form onSubmit={handleProfilePicture}>
            <Grid item xs={3} md={2}>
              <GrImageButton focusRipple>
                <GrImageSrc
                  style={{
                    backgroundImage:
                      `url(${user?.user?.profilePicture?.url})` ||
                      "https://source.unsplash.com/random",
                  }}
                />
                <GrImageBackdrop className="MuiImageBackdrop-root" />
                <GrImage
                  aria-label="upload picture"
                  component="label"
                  onClick={() => {
                    setOpenImage(true);
                  }}
                >
                  <PhotoCamera />
                </GrImage>
                <Modal
                  id="image"
                  isOpen={openImage}
                  onRequestClose={() => {
                    setOpenImage(false);
                  }}
                  aria={{
                    labelledby: "Hero",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={isMobile ? customMobileStyles : customStyles}
                  contentLabel="Hero"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <UserProfileImage
                    profilePicture={profilePicture}
                    setOpenImage={setOpenImage}
                    handleChange={handleChange}
                    handleProfilePicture={handleProfilePicture}
                    setProfilePicture={setProfilePicture}
                  />
                </Modal>
              </GrImageButton>
            </Grid>
          </form>
          <Grid
            item
            xs={9}
            md={10}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={12}>
              <GrBigTypography
                variant="h3"
                component="h3"
                sx={{ fontWeight: "bold" }}
              >
                Hi, {user && firstname}
              </GrBigTypography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <GrItem elevation={0}>
                  <GrLink to="/create-hero">
                    <Typography variant="h6" color="grey.500">
                      Create Hero
                    </Typography>
                  </GrLink>
                </GrItem>
                <GrItem elevation={0}>
                  <GrLink to="/create-testimony">
                    <Typography variant="h6">Create Testimony</Typography>
                  </GrLink>
                </GrItem>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </GrBox>

      <Divider sx={{ bgcolor: "background.paper", mt: 3, mb: 3 }} />
    </Container>
  );
};

export default UserProfile;
