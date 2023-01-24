import {
  Container,
  Stack,
  Grid,
  Box,
  IconButton,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  GrBox,
  GrItem,
  GrAvatar,
  GrBigTypography,
  GrLink,
  GrImageBackdrop,
  GrImageButton,
  GrImageSrc,
  GrImage,
} from "./UserProfile.styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useSelector } from "react-redux";

const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.auth);
  const username = user?.user?.name;
  const firstname = username.split(" ")[0];

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
          <Grid item xs={3} md={2}>
            <Box style={{ position: "relative" }}>
              <GrAvatar
                src={user?.user?.profilePicture?.url}
                sx={{ position: "relative" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 2,
                }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
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
              <GrImage>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  style={{ zIndex: 2, position: "relative" }}
                />
                <PhotoCamera />
              </GrImage>
            </GrImageButton>
          </Grid>
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
                  <GrLink to="/express-gratitude">
                    <Typography variant="h6">Give Gratitude</Typography>
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
