import React, { Fragment, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const DiscoverSearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/discover/search/${keyword}`);
    } else {
      navigate("/discover");
    }
  };

  return (
    <Fragment>
      <form onSubmit={searchHandler} className="mb-lg-5">
        <div className="input-group mb-4 border border-1 border-dark rounded-pill p-1">
          <div className="input-group-prepend border-0">
            <button
              id="button-addon4"
              type="submit"
              className="btn btn-link text-info"
            >
              <GrSearch className="sc-searchbar" />
            </button>
          </div>
          <input
            type="text"
            id="search_field"
            placeholder="Search for a hero..."
            aria-describedby="button-addon4"
            className="form-control bg-none border-0"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default DiscoverSearchBar;
