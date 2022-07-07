import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../../../images/banner-test.jpg";
import dayjs from "dayjs";

const Appreciation = ({ appreciation }) => {
  const apprDate = dayjs(appreciation?.createdAt).format("MMM D, YYYY");
  const apprStory = appreciation?.story.replace(/(<([^>]+)>)/gi, "");
  return (
    <Fragment>
      <Row
        className="mb-lg-5 text-decoration-none text-dark"
        as={Link}
        to={`/appreciation/${appreciation?._id}`}
      >
        <p>{apprDate}</p>
        <div className="mb-3">
          <div className="d-flex position-relative align-content-around">
            <div className="me-lg-5">
              <h5 className="mt-0 fw-bold">{appreciation?.summary}</h5>
              <p>{apprStory.substring(0, 300)}</p>
            </div>
            <div className="justify-content-end">
              {appreciation?.image ? (
                <img
                  src={appreciation?.image.url}
                  className="flex-shrink-0 mb-2"
                  width="150"
                  height="150"
                  alt={`${appreciation?.name}'s appreciator `}
                />
              ) : (
                <img
                  src={Banner}
                  className="flex-shrink-0 mb-2"
                  width="150"
                  height="150"
                  alt={`${appreciation?.name}'s appreciator `}
                />
              )}
              <p className="text-end">
                {appreciation.user?.name
                  ? appreciation.user.name
                  : "Social-Coin User"}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </Row>
    </Fragment>
  );
};

export default Appreciation;
