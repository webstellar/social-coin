import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Image,
  Modal,
  Button,
  Badge,
} from "react-bootstrap";
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
import { Player } from "video-react";
import { shareOnLinkedIn, shareOnFacebook } from "../../utils/SocialShare";

const ShareAppreciations = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const { loading, error, appreciation } = useSelector(
    (state) => state.appreciationDetails
  );

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
    //return () => clearTimeout(timer);

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
          <Modal show={show} onHide={handleClose} className="sc-modal-control">
            <Modal.Header closeButton>
              <Modal.Title>Let everyone know</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Share on:</p>
              <div>
                <button 
                    onClick = {shareOnFacebook}
                    className="pe-2"
                    style={{ background: "transparent", border: "none"}}
                  >
                    <FacebookIcon size={40} round />
                </button>
                <TwitterShareButton
                  title={appreciation.summary}
                  url={`${shareUrl}`}
                  hashtags={["appreciatio", "socialcoin"]}
                  className="pe-2"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <button 
                  onClick = {shareOnLinkedIn}
                  className="pe-2"
                  style={{ background: "transparent", border: "none"}}
                >
                  <LinkedinIcon size={40} round />
                </button>
                <EmailShareButton
                  subject={appreciation.summary}
                  body={appreciation.story}
                >
                  <EmailIcon size={40} round />
                </EmailShareButton>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Container>
            <ErrorBoundary>
              <Row className="justify-content-center mb-5">
                <ul className="sc-progressbar">
                  <li className="active">
                    <Link
                      to="/hero/new"
                      className="active text-dark text-decoration-none"
                    >
                      name your hero
                    </Link>
                  </li>
                  <li className="active">appreciate your hero</li>
                  <li className="active">share your appreciate</li>
                </ul>
              </Row>
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
                        <button 
                            onClick = {shareOnFacebook}
                            className="pe-2"
                            style={{ background: "transparent", border: "none"}}
                          >
                            <FacebookIcon size={25} round />
                        </button>
                        <TwitterShareButton
                          title={appreciation.summary}
                          url={`${shareUrl}`}
                          hashtags={["appreciatio", "socialcoin"]}
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

                    <div className="mb-3">
                      {appreciation.tags &&
                        appreciation.tags.map((tag, i) => { 
                          return (
                            <><Badge pill bg="dark" key={i}>
                              {tag}
                            </Badge>&nbsp;</>
                          )}
                        )
                      }
                      
                    </div>

                    <div>
                      {appreciation.video ? (
                        <Player>
                          <source src={appreciation.video?.url} />
                        </Player>
                      ) : (
                        ""
                      )}
                    </div>
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

export default ShareAppreciations;
