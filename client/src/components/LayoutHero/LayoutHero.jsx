import PropTypes from "prop-types";
import { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { Grid, Container } from "@mui/material";
import { GrParaBox } from "./LayoutHero.styles";
import ListMenu from "../ListMenu/ListMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LayoutHero = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="lg">
        <GrParaBox>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={4}>
              <ListMenu />
            </Grid>
            <Grid item xs={12} md={8}>
              <main>{children}</main>
            </Grid>
          </Grid>
        </GrParaBox>
      </Container>

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

LayoutHero.propTypes = {
  children: PropTypes.any,
};

export default LayoutHero;
