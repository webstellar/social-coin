import * as React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { Grid, Container } from "@mui/material";
import { GrParaBox } from "./LayoutGratitude.styles";
import ListMenu from "../ListMenu/ListMenu";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FilterContext } from "../../pages/Testimonies";

const LayoutGratitude = ({ children }) => {
  const {
    category,
    setCategory,
    keyword,
    setKeyword,
    tag,
    setTag,
    searchHandler,
  } = React.useContext(FilterContext);

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
            <Grid item xs={12} sm={12} md={5}>
              <ListMenu
                category={category}
                setCategory={setCategory}
                keyword={keyword}
                setKeyword={setKeyword}
                tag={tag}
                setTag={setTag}
                searchHandler={searchHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
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
