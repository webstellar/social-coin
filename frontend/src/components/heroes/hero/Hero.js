import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = ({ hero }) => {
  const appreciations = hero.appreciations;
  const appr = appreciations[appreciations.length - 1];
  return (
    <Fragment>
      <Col as={Link} to={`/hero/${hero._id}`}>
        <Card
          className="bg-dark text-white mb-4 pr-3"
          style={{
            width: "11.5rem",
            height: "15rem",
            borderRadius: "8px",
          }}
        >
          <Card.Img
            src={hero.profilePicture?.url}
            alt="Card image"
            className="img-fluid"
          />
          <Card.ImgOverlay>
            <Card.Body>
              <Row>
                <Col className="d-flex justify-content-end hero-count ">
                  <div style={{ backgroundColor: "#fff" }}>
                    <span>
                      <MdMessage />
                    </span>
                    <span className="ps-1">{hero.appreciations.length}</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <div className="sc-summary-text p-3 text-center card-bg-color">
              {appr?.summary.substring(0, 40)}...
            </div>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Fragment>
  );
};

export default Hero;
