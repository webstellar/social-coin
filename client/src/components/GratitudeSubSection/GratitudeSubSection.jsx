import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Divider,
  Container,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import { shareOnFacebook, shareOnLinkedIn } from "../../utils/SocialShare";

import { GrBox } from "./GratitudeSubSection.styles";

const GratitudeSubSection = ({ gratitude }) => {
  return (
    <section>
      <GrBox>
        <Container maxWidth="lg">
          <Typography component="p" variant="p" gutterBottom>
            {gratitude?.summary}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6} sm={6} md={6}>
              <Typography variant="caption" component="p">
                by <strong>{gratitude?.user?.name}</strong>
              </Typography>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              xs={6}
              sm={6}
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
                <IconButton sx={{ cursor: "pointer" }}>
                  <TwitterIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton sx={{ cursor: "pointer" }}>
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
  gratitude: PropTypes.array,
};

export default GratitudeSubSection;
