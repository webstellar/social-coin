import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    document.title = "Gratitude";
  }, []);

  return (
    <Fragment>
      <Header />
      <main>{children}</main>

      <CookieConsent
        location="bottom"
        buttonText="I understand"
        declineButtonText="I decline"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Footer />
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
