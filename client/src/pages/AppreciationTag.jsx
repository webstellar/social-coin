import * as React from "react";
import Layout from "../components/Layout/Layout";
import TagAppreciationHero from "../components/TagAppreciationHero/TagAppreciationHero";
import TagAppreciationList from "../components/TagAppreciationList/TagAppreciationList";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTagGratitude } from "../redux/gratitudes/gratitudesSlice";
import { toast } from "react-toastify";

const AppreciationTag = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, tagAppreciations } = useSelector((state) => ({
    ...state.gratitudes,
  }));

  React.useEffect(() => {
    if (id) {
      dispatch(getTagGratitude(id));
    }

    error && toast.error(error);
  }, [dispatch, error, id]);

  return (
    <Layout>
      <TagAppreciationHero />
      <TagAppreciationList appreciation={tagAppreciations} />
    </Layout>
  );
};

export default AppreciationTag;
