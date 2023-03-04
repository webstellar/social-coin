import * as React from "react";
import LayoutGratitude from "../components/LayoutGratitude/LayoutGratitude";
import GeneralPagination from "../components/GeneralPagination/GeneralPagination";
import { getGratitudes } from "../redux/gratitudes/gratitudesSlice";

import GratitudesCard from "../components/GratitudeCardBig/GratitudesCard";
import { useDispatch, useSelector } from "react-redux";

const Testimonies = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [category, setCategory] = React.useState("");
  const [tag, setTag] = React.useState("");

  const { appreciations, numberOfPages } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    dispatch(getGratitudes(currentPage));
  }, [dispatch, currentPage]);

  return (
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
  );
};

export default Testimonies;
