import React, { Fragment, useEffect } from "react";
import { Container, Row, Col, Navbar, Image } from "react-bootstrap";
import ErrorBoundary from "../../ErrorBoundary";
import Loader from "../layout/Loader";
import MetaData from "../../components/layout/MetaData";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";
import Banner from "../../images/banner-test.jpg";
import AppreciationDetailsSideBarBottom from "./AppreciationDetailsSideBarBottom";

import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppreciationDetails,
  clearErrors,
} from "../../actions/appreciationActions";

import { toast, ToastContainer } from "react-toastify";
import { Parser } from "html-to-react";

const AppreciationDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, appreciation } = useSelector(
    (state) => state.appreciationDetails
  );

  useEffect(() => {
    dispatch(getAppreciationDetails(params.id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error, params.id]);

  const apprDate = dayjs(appreciation.createdAt).format("MMM D, YYYY");
  let shareUrl = window.location.href;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData
            title={`${appreciation.summary}`}
            description={`${appreciation.story}`}
            image={`${appreciation.image?.url}`}
          />
          <Container>
            <ErrorBoundary>
              <Row>
                <Col sm={8} className="hero-details-col pe-5">
                  <Navbar className="justify-content-start mb-5">
                    <Navbar.Brand as={Link} to="/">
                      <img
                        src={
                          appreciation.user?.profilePicture
                            ? appreciation.user.profilePicture
                            : "https://picsum.photos/200"
                        }
                        alt="mdo"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand>
                      <span className="fw-bold" style={{ fontSize: "18px" }}>
                        {appreciation.user?.name
                          ? appreciation.user.name
                          : "Social-Coin User"}
                      </span>
                      <span className="d-flex" style={{ fontSize: "12px" }}>
                        {apprDate}
                      </span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end sc-appreciation-icon">
                      <div>
                        <FacebookShareButton
                          url={`${shareUrl}`}
                          quote={appreciation.summary}
                          hashtag={"#socialcoin"}
                          description={appreciation.story}
                          className="pe-2"
                        >
                          <FacebookIcon size={25} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                          title={appreciation.summary}
                          url={`${shareUrl}`}
                          hashtags={["appreciation", "socialcoin"]}
                          className="pe-2"
                        >
                          <TwitterIcon size={25} round />
                        </TwitterShareButton>
                        <LinkedinShareButton
                          title={appreciation.summary}
                          summary={appreciation.story}
                          url={`${shareUrl}`}
                          className="pe-2"
                        >
                          <LinkedinIcon size={25} round />
                        </LinkedinShareButton>
                        <EmailShareButton
                          subject={appreciation.summary}
                          body={appreciation.story}
                        >
                          <EmailIcon size={25} round />
                        </EmailShareButton>
                      </div>
                    </Navbar.Collapse>
                  </Navbar>
                  <div>
                    <h1 className="fw-bolder fs-4 mb-4">
                      {appreciation.summary}
                    </h1>
                    <div className="mb-4">
                      {appreciation.image ? (
                        <Image
                          src={appreciation.image.url}
                          style={{ width: "800px", height: "500px" }}
                          className="img-fluid"
                        />
                      ) : (
                        <Image
                          src={Banner}
                          style={{ width: "800px", height: "500px" }}
                          className="img-fluid"
                        />
                      )}
                    </div>
                    <p>{Parser().parse(appreciation.story)}</p>
                  </div>
                </Col>
                <Col sm={4} className="ps-5">
                  <AppreciationDetailsSideBarBottom />
                </Col>
              </Row>
            </ErrorBoundary>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppreciationDetails;
