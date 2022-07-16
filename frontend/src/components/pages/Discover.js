import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Hero from "../heroes/hero/Hero";
import CarouselSlide from "../layout/CarouselSlide";
import DiscoverSearchBar from "../layout/DiscoverSearchBar";
import Loader from "../layout/Loader";
import ErrorBoundary from "../../ErrorBoundary";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Carousel,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../actions/heroActions";
import { ToastContainer, toast } from "react-toastify";

const Discover = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const { loading, heroes, error, heroesCount } = useSelector(
    (state) => state.heroes
  );

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    dispatch(getHeroes(keyword));
  }, [dispatch, keyword, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Hero appreciation app"} />
          <Container>
            <Row className="mb-5">
              <ErrorBoundary>
                <Carousel
                  variant="dark"
                  activeIndex={index}
                  onSelect={handleSelect}
                  style={{ backgroundColor: "rgb(228, 228, 228, 0.2)" }}
                  className="py-5"
                >
                  {heroes &&
                    heroes
                      .slice(0, 4)
                      .reverse()
                      .filter((hero) => hero.appreciations.length >= 1)
                      .map((hero) => {
                        const appreciations = hero.appreciations;
                        const appr = appreciations[appreciations.length - 1];
                        return (
                          <Carousel.Item key={hero._id}>
                            <Row>
                              <Col xs={6} md={4} className="align-self-center">
                                <img
                                  className="w-100"
                                  src={
                                    appr.image
                                      ? appr.image.url
                                      : "https://picsum.photos/200"
                                  }
                                  alt="First slide"
                                  height="300"
                                />
                              </Col>
                              <Col xs={12} md={8} className="align-self-center">
                                <div>
                                  <span className="border border-1 rounded-pill border-dark py-2 px-5 text-dark">
                                    LATEST
                                  </span>
                                  <h3 className="fw-bolder mt-3">
                                    {appr.summary.substring(0, 45)}...
                                  </h3>
                                  <div className="mt-2">
                                    <ListGroup.Item
                                      as={Link}
                                      to={`/appreciation/${appr?._id}`}
                                      style={{
                                        backgroundColor: "rgba(0, 0, 0, 0)",
                                      }}
                                      className="sc-sidedarlink mb-1"
                                    >
                                      <Navbar className="justify-content-start">
                                        <Navbar.Brand>
                                          <img
                                            src={hero.profilePicture.url}
                                            alt="mdo"
                                            width="80"
                                            height="80"
                                            className="rounded-circle"
                                          />
                                        </Navbar.Brand>
                                        <Navbar.Brand>
                                          <span
                                            className="fw-bold"
                                            style={{ fontSize: "20px" }}
                                          >
                                            {hero.name}
                                          </span>
                                          <span
                                            className="d-flex"
                                            style={{ fontSize: "16px" }}
                                          >
                                            {hero.country}
                                          </span>
                                        </Navbar.Brand>
                                      </Navbar>
                                    </ListGroup.Item>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Carousel.Item>
                        );
                      })}
                </Carousel>
              </ErrorBoundary>
            </Row>
            <Row className="mb-5">
              <DiscoverSearchBar />
            </Row>

            <Row sm={3} md={6}>
              <ErrorBoundary>
                {heroes &&
                  heroes
                    .filter((hero) => hero.appreciations.length >= 1)
                    .map((hero) => <Hero key={hero._id} hero={hero} />)}
              </ErrorBoundary>
            </Row>
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

export default Discover;
