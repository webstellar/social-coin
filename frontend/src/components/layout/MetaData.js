import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, description, image }) => {
  return (
    <Helmet>
      <title>{`${title} - Social Coin`}</title>
      <meta property="og:title" content={`${title}`} data-rh="true" />
      <meta
        property="og:description"
        content={`${description}`}
        data-rh="true"
      />
      <meta property="og:image" content={`${image}`} data-rh="true" />
    </Helmet>
  );
};

export default MetaData;
