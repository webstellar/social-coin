import { Fragment, useState } from "react";
import { ListGroup, Navbar, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselSlide = ({ hero, className }) => {
  const appreciations = hero.appreciations;
  const appr = appreciations[appreciations.length - 1];

  return (
    <Fragment>
      <div className={className}>
        <div className="row align-items-center">
          <div className="col-4 align-self-center">
            <img
              src={appr.image ? appr.image.url : "https://picsum.photos/200"}
              className="w-100"
              alt="..."
            />
          </div>
          <div className="col-8 align-self-center">
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CarouselSlide;
