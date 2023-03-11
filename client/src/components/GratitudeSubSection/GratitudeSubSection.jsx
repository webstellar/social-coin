import { Grid, Divider, Container, IconButton } from "@mui/material";
import PropTypes from "prop-types";
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
        </Container>
      </GrBox>
    </section>
  );
};

GratitudeSubSection.propTypes = {
  gratitude: PropTypes.object,
};

export default GratitudeSubSection;
