import React from "react";
import PropTypes from "prop-types";
import { GrIframe, GrLink } from "./YoutubeEmbed.styles";

const YoutubeEmbedForm = ({ video, summary }) => (
  <GrLink className="video-responsive">
    <GrIframe
      width="400"
      height="250"
      src={`https://www.youtube.com/embed/${video}` || null}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={summary}
    />
  </GrLink>
);

YoutubeEmbedForm.propTypes = {
  video: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default YoutubeEmbedForm;
