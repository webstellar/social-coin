import React, { Fragment, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../actions/heroActions";

const DiscoverSearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [keyword, setKeyword] = useState("");
  let debounceTimeout = 0;
  
  /* Debounce Search */
  const searchHandler = (value) => {
    if (value!=="") {
      /* api call for keyword search: TODO: -> change the state of heroes array */
      dispatch(getHeroes(value));
    } else {
      navigate("/discover");
    }
  };
  const debounceSearch = (event) => {
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    debounceTimeout = setTimeout(() => {
      searchHandler(value);
    }, 300);
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
            onChange={(e) => debounceSearch(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default DiscoverSearchBar;
