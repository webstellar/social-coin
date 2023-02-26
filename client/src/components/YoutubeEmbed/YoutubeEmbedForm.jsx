import React from "react";
import PropTypes from "prop-types";
import { GrIframe, GrLink } from "./YoutubeEmbed.styles";

const YoutubeEmbedForm = ({ video, summary }) => {
  const [youtubeId, setYoutubeId] = React.useState("");

  React.useEffect(() => {
    if (video) {
      let videoUrl = video.toString();

      if (videoUrl.includes("https://www.youtube.com/watch?v=")) {
        var yID = videoUrl.split("https://www.youtube.com/watch?v=");
        yID = yID[1].split("&");
        console.log(yID);

        setYoutubeId(yID[0]);
      }
    }
  }, [video]);

  console.log(youtubeId);

  return (
    <GrLink className="video-responsive">
      <GrIframe
        width="400"
        height="250"
        src={`https://www.youtube.com/embed/${youtubeId}` || null}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={summary}
      />
    </GrLink>
  );
};
YoutubeEmbedForm.propTypes = {
  video: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default YoutubeEmbedForm;
