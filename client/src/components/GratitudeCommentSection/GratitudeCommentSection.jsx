import * as React from "react";
import PropTypes from "prop-types";
import { Container, Divider, Grid, IconButton } from "@mui/material";
import { GrBox, GrItem, GrTypography } from "./GratitudeCommentSection.styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import { shareOnFacebook, shareOnLinkedIn } from "../../utils/SocialShare";
import DisqusThread from "../Disqus/DisqusThread";

const GratitudeCommentSection = ({ gratitude, id }) => {
  return (
    <section>
      <GrBox>
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            columnSpacing={6}
          >
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on Facebook</GrTypography>
                <IconButton onClick={shareOnFacebook}>
                  <FacebookIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on Twitter</GrTypography>
                <IconButton sx={{ cursor: "pointer" }}>
                  <TwitterIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on LinkedIn</GrTypography>{" "}
                <IconButton onClick={shareOnLinkedIn}>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on Mail</GrTypography>{" "}
                <IconButton sx={{ cursor: "pointer" }}>
                  <MailIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
          </Grid>
          <Divider sx={{ bgcolor: "background.paper", mt: 9, mb: 6 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={12}>
              <DisqusThread
                id={id}
                title={gratitude?.summary}
                path={`/appreciation/${id}`}
              />
            </Grid>
          </Grid>
        </Container>
      </GrBox>
    </section>
  );
};

GratitudeCommentSection.propTypes = {
  gratitude: PropTypes.any,
  id: PropTypes.any,
};
export default GratitudeCommentSection;
