import PropTypes from "prop-types";
import { Container } from "@mui/material";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";

import { GrBox } from "./GratitudeMainSection.styles";

const GratitudeMainSection = ({ gratitude }) => {
  return (
    <section>
      <GrBox>
        <Container maxWidth="lg">
          <div id="video">
            <Container maxWidth="md">
              <YoutubeEmbed gratitude={gratitude} />
            </Container>
          </div>

          <div
            id="testimony"
            style={{ fontSize: "20px", fontWeight: "400", marginTop: "4rem" }}
            dangerouslySetInnerHTML={{ __html: gratitude.story }}
          />
        </Container>
      </GrBox>
    </section>
  );
};

GratitudeMainSection.propTypes = {
  gratitude: PropTypes.object,
};
export default GratitudeMainSection;
