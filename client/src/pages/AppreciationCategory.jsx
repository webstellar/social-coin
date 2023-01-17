import * as React from "react";
import Layout from "../components/Layout/Layout";
import TagCategoryHero from "../components/TagCategoryHero/TagCategoryHero";
import CategoryAppreciationList from "../components/CategoryAppreciationList/CategoryAppreciationList";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryGratitude } from "../redux/gratitudes/gratitudesSlice";
import { toast } from "react-toastify";

const AppreciationCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { error, categoryAppreciations } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    if (category) {
      dispatch(getCategoryGratitude(category));
    }

    error && toast.error(error);
  }, [dispatch, error, category]);

  return (
    <Layout>
      <TagCategoryHero />
      <CategoryAppreciationList appreciations={categoryAppreciations} />
    </Layout>
  );
};

export default AppreciationCategory;
