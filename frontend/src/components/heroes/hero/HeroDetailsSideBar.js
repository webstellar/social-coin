import React, { Fragment } from "react";
import { ReactComponent as Envelope } from "../../../images/envelope-plus.svg";
import SearchBar from "../../layout/SearchBar";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

const HeroDetailsSideBar = ({ hero }) => {
  const appr = hero.appreciations;
  return (
    <Fragment>
      <SearchBar />
      <img
        src={hero.profilePicture ? hero.profilePicture.url : null}
        alt="mdo"
        width="150"
        height="150"
        className="rounded-circle mb-3"
      />
      <h5 className="mt-0 fw-bold">{hero.name}</h5>
      <span className="mt-1 fw-bold pe-1">{appr?.length}</span>
      {appr?.length > 1 ? (
        <span className="mt-1 fw-bold">Appreciations</span>
      ) : (
        <span className="mt-1 fw-bold">Appreciation</span>
      )}
      <p className="mt-1 mb-4">{hero.description}</p>
      <button type="button" className="btn btn-dark rounded-pill px-3 me-3">
        <Link
          to="/appreciation/new"
          className="text-light text-decoration-none"
        >
          <BsPlus />
          APPRECIATE
        </Link>
      </button>
      <span className="border border-2 border-dark text-dark rounded-circle p-2">
        <Envelope />
      </span>
    </Fragment>
  );
};

export default HeroDetailsSideBar;
