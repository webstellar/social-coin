import * as React from "react";
import LayoutGratitude from "../components/LayoutGratitude/LayoutGratitude";
import GeneralPagination from "../components/GeneralPagination/GeneralPagination";
import { getFilters } from "../redux/gratitudes/gratitudesSlice";

import GratitudesCard from "../components/GratitudeCardBig/GratitudesCard";
import TestimonySorting from "../components/TestimonySorting/TestimonySorting";
import { useDispatch, useSelector } from "react-redux";

export const FilterContext = React.createContext();

const Testimonies = () => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [category, setCategory] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [tag, setTag] = React.useState([]);
  const [sort, setSort] = React.useState({ sort: "createdAt", order: "desc" });

  const { appreciations, numberOfPages } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    dispatch(getFilters({ page, tag, category, sort }));
  }, [dispatch, page, tag, category, sort]);

  const handleSort = (e) => {
    setSort({ sort: e.target.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      dispatch(getFilters({ keyword, page, tag, category, sort }));
    }
  };

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory,
        keyword,
        setKeyword,
        tag,
        setTag,
        sort,
        setSort,
        handleSort,
        searchHandler,
        onArrowChange,
      }}
    >
      <LayoutGratitude>
        <div>
          <TestimonySorting />
        </div>
        <div>
          {appreciations &&
            appreciations.map((appreciation) => (
              <GratitudesCard key={appreciation._id} gratitude={appreciation} />
            ))}
        </div>
        <div>
          <GeneralPagination
            setCurrentPage={setPage}
            currentPage={page}
            numberOfPages={numberOfPages}
          />
        </div>
      </LayoutGratitude>
    </FilterContext.Provider>
  );
};

export default Testimonies;
