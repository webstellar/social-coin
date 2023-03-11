import PropTypes from "prop-types";
import { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { Grid, Container } from "@mui/material";
import { GrParaBox } from "./LayoutGratitude.styles";
import ListMenu from "../ListMenu/ListMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LayoutGratitude = ({ children }) => {
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
            columnGap={2}
            rowGap={6}
          >
            <Grid item xs={12} sm={4} md={4}>
              <ListMenu />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div>{children}</div>
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

LayoutGratitude.propTypes = {
  children: PropTypes.any,
};

export default LayoutGratitude;
