import React, { Fragment } from "react";
import { ListGroup, Navbar, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselSlider = ({ hero }) => {
  const appreciations = hero.appreciations;
  const appr = appreciations[appreciations.length - 1];

  return (
    <Fragment>
      <Carousel.Item>
        <Row>
          <Col xs={6} md={4} className="align-self-center">
            <img
              className="w-100"
              src={appr.image ? appr.image.url : "https://picsum.photos/200"}
              alt="First slide"
            />
          </Col>
          <Col xs={12} md={8} className="align-self-center">
            <div>
              <p>Latest</p>
              <h5 className="fw-bolder">{appr.summary}</h5>
              <div className="mt-2">
                <ListGroup.Item
                  as={Link}
                  to={`/appreciation/${appr?._id}`}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  className="sc-sidedarlink mb-1"
                >
                  <Navbar className="justify-content-start">
                    <Navbar.Brand>
                      <img
                        src={hero.profilePicture.url}
                        alt="mdo"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand>
                      <span className="fw-bold" style={{ fontSize: "16px" }}>
                        {hero.name}
                      </span>
                      <span className="d-flex" style={{ fontSize: "12px" }}>
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
    </Fragment>
  );
};

export default CarouselSlider;
