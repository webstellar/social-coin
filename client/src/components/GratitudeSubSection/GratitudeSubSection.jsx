import {
  Grid,
  Divider,
  Container,
  IconButton,
  Typography,
  Box,
  Stack,
  Link,
} from "@mui/material";
import PropTypes from "prop-types";
import { GrItem } from "./GratitudeSubSection.styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import {
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnTwitter,
  shareOnEmail,
} from "../../utils/SocialShare";

import { GrBox } from "./GratitudeSubSection.styles";

const GratitudeSubSection = ({ gratitude }) => {
  return (
    <section>
      <GrBox>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              xs={7}
              sm={7}
              md={4}
              spacing={2}
            >
              <Grid item>
                <IconButton
                  onClick={shareOnFacebook}
                  sx={{ cursor: "pointer" }}
                >
                  <FacebookIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={shareOnLinkedIn}
                  sx={{ cursor: "pointer" }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={shareOnTwitter} sx={{ cursor: "pointer" }}>
                  <TwitterIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={(gratitude) => {
                    shareOnEmail(gratitude);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <MailIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: "background.paper", mt: 3, mb: 3 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <GrItem elevation={0}>
                <Link
                  href="#video"
                  color="inherit"
                  variant="body2"
                  underline="hover"
                >
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#F6430A",
                      },
                    }}
                  >
                    Video
                  </Typography>
                </Link>
              </GrItem>
              <GrItem elevation={0}>
                <Link
                  href="#testimony"
                  color="inherit"
                  variant="body2"
                  underline="hover"
                >
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#F6430A",
                      },
                    }}
                  >
                    Testimony
                  </Typography>
                </Link>
              </GrItem>
            </Stack>
          </Box>
        </Container>
      </GrBox>
    </section>
  );
};

GratitudeSubSection.propTypes = {
  gratitude: PropTypes.object,
};

export default GratitudeSubSection;
