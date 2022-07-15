import React, { useEffect, Fragment } from "react";
import HeroAppreciationLink from "../heroes/hero/HeroAppreciationLink";
import { ListGroup } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../actions/heroActions";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

import SearchBar from "../layout/SearchBar";
import { ReactComponent as Envelope } from "../../images/envelope-plus.svg";

const AppreciationDetailsSideBarBottom = () => {
  const dispatch = useDispatch();

  const { loading, heroes, error } = useSelector((state) => state.heroes);

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch, error]);

  return (
    <Fragment>
      <SearchBar />
      <div>
        <button type="button" className="btn btn-dark rounded-pill px-3 me-3">
          <Link to="/hero/new" className="text-light text-decoration-none">
            <BsPlus />
            APPRECIATE
          </Link>
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ListGroup variant="flush" className="mb-4 mt-4">
            <span>
              <span
                style={heroes ? { color: "#4CAF50" } : { color: "#FF5252" }}
              >
                <GoPrimitiveDot />
              </span>
              See Who Got Appreciated Today
            </span>
            {heroes &&
              heroes
                .slice(0, 5)
                .filter((hero) => hero.appreciations.createdAt)
                .map((heroes, i) => (
                  <HeroAppreciationLink
                    key={i}
                    heroes={heroes}
                  ></HeroAppreciationLink>
                ))}
          </ListGroup>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppreciationDetailsSideBarBottom;
