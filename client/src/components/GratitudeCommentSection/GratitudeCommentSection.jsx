import * as React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import { GrBox, GrItem, GrTypography } from "./GratitudeCommentSection.styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import {
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnTwitter,
  shareOnEmail,
} from "../../utils/SocialShare";
//import DisqusThread from "../Disqus/DisqusThread";

const GratitudeCommentSection = ({
  gratitude,
  user,
  comment,
  setComment,
  onSubmit,
}) => {
  const reviews = gratitude?.reviews;
  const commentLength = reviews?.length;

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
                <IconButton onClick={shareOnTwitter} sx={{ cursor: "pointer" }}>
                  <TwitterIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on LinkedIn</GrTypography>
                <IconButton onClick={shareOnLinkedIn}>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
            <Grid item xs={3} md={3}>
              <GrItem>
                <GrTypography>Share on Mail</GrTypography>
                <IconButton
                  onClick={(subject) => {
                    shareOnEmail(subject);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <MailIcon fontSize="large" />
                </IconButton>
              </GrItem>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={6} md={6}>
              <Typography color="inherit" sx={{ mt: 9 }}>
                {commentLength} Comments
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography color="inherit" align="right" sx={{ mt: 9 }}>
                {user?.user?._id ? user?.user?.name : null}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: "background.paper", mb: 3 }} />
          <form onSubmit={onSubmit}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                item
                xs={12}
                md={12}
                rowGap={0}
                rowSpacing={0}
                spacing={0}
              >
                <Grid item sm={1} md={1} xl={1}>
                  <Avatar
                    alt={user?.user?.name}
                    src={user?.user?.profilePicture?.url}
                    sx={{ width: 50, height: 50 }}
                  />
                </Grid>
                <Grid item sm={10} md={10} xl={10}>
                  <TextField
                    name="comment"
                    value={comment}
                    type="text"
                    label="Comment"
                    multiline
                    maxRows={4}
                    fullWidth
                    color="secondary"
                    onClick={(e) => {
                      setComment(e.target.value);
                    }}
                    sx={{
                      color: "#000",
                    }}
                  />
                </Grid>
                <Grid item sm={1} md={1} xl={1}>
                  <IconButton
                    aria-label="send"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    <SendIcon fontSize="inherit" color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
              {/*

<Grid item xs={12} md={12}>
                <DisqusThread
                  id={id}
                  title={gratitude?.summary}
                  path={`/appreciation/${id}`}
                />
              </Grid>
*/}
            </Grid>
          </form>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mt: 5 }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              item
              xs={12}
              md={12}
              rowGap={0}
              rowSpacing={0}
              spacing={0}
            >
              {gratitude.reviews
                ? gratitude?.reviews.map((review) => (
                    <>
                      <Grid item sm={1} md={1} xl={1} key={review?._id}>
                        <Avatar
                          alt={review?.name}
                          src={review?.profilePicture?.url}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Grid>
                      <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        item
                        sm={8}
                        md={8}
                        xl={8}
                      >
                        <Grid item sm={12} md={12}>
                          <Typography color="inherit">
                            {review?.name}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={12}>
                          <Typography color="inherit">
                            {review?.createdAt}
                          </Typography>
                        </Grid>
                        <Grid item sm={12} md={12}>
                          <Typography color="inherit">
                            {review?.comment}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item sm={2} md={2} xl={2}></Grid>
                    </>
                  ))
                : null}
            </Grid>
          </Grid>
        </Container>
      </GrBox>
    </section>
  );
};

GratitudeCommentSection.propTypes = {
  gratitude: PropTypes.object,
  user: PropTypes.object,
  comment: PropTypes.string,
  setComment: PropTypes.any,
  onSubmit: PropTypes.any,
};
export default GratitudeCommentSection;
