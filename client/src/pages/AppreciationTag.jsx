import * as React from "react";
import Layout from "../components/Layout/Layout";
import TagCategoryHero from "../components/TagCategoryHero/TagCategoryHero";
import TagAppreciationList from "../components/TagAppreciationList/TagAppreciationList";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTagGratitude } from "../redux/gratitudes/gratitudesSlice";
import { toast } from "react-toastify";

const AppreciationTag = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();

  const { error, tagAppreciations } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  console.log(tagAppreciations);

  React.useEffect(() => {
    if (tag) {
      dispatch(getTagGratitude(tag));
    }

    error && toast.error(error);
  }, [dispatch, error, tag]);

  return (
    <Layout>
      <TagCategoryHero />
      <TagAppreciationList appreciations={tagAppreciations} />
    </Layout>
  );
};

export default AppreciationTag;
