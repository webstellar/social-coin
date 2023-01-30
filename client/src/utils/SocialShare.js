// Use this if you are are a developer and testing app on local machine
const defaultURL = `https://hhero.org/appreciation/62e78959fd6db6181a784780`;

export const shareOnLinkedIn = () => {
  const URL = `https://www.linkedin.com/sharing/share-offsite/?url=${document.URL}`;
  window.open(
    URL,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  );
};

export const shareOnFacebook = () => {
  const URL = `https://www.facebook.com/sharer/sharer.php?u=${document.URL}&hashtag=%23socialcoin`;
  window.open(
    URL,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  );
};

export const shareOnTwitter = () => {
  const URL = `https://www.twitter.com/intent/tweet?url=${document.URL}`;
  window.open(
    URL,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  );
};

export const shareOnEmail = (gratitude) => {
  const URL = `mailto:?subject=${gratitude.summary}&body=Im%20sharing%20this%20testimony%20with%20you%20from${document.URL}`;
  window.open(
    URL,
    "_blank",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  );
};
