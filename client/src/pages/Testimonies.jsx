import * as React from "react";
import LayoutGratitude from "../components/LayoutGratitude/LayoutGratitude";
import GeneralPagination from "../components/GeneralPagination/GeneralPagination";
import { getFilteredGratitudes } from "../redux/gratitudes/gratitudesSlice";

import GratitudesCard from "../components/GratitudeCardBig/GratitudesCard";
import { useDispatch, useSelector } from "react-redux";

export const FilterContext = React.createContext();

const Testimonies = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [category, setCategory] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [tag, setTag] = React.useState("");

  const { appreciations, numberOfPages } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  console.log("category", category);
  console.log("tag", tag);
  console.log("keyword", search);

  React.useEffect(() => {
    dispatch(getFilteredGratitudes({ search, currentPage, tag, category }));
  }, [dispatch, currentPage, search, tag, category]);

  return (
    <FilterContext.Provider
      value={{ category, setCategory, search, setSearch, tag, setTag }}
    >
      <LayoutGratitude>
        <div>
          {appreciations &&
            appreciations.map((appreciation) => (
              <GratitudesCard key={appreciation._id} gratitude={appreciation} />
            ))}
        </div>
        <div>
          <GeneralPagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </div>
      </LayoutGratitude>
    </FilterContext.Provider>
  );
};

export default Testimonies;
