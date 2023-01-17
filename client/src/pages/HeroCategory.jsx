import * as React from "react";
import Layout from "../components/Layout/Layout";
import TagCategoryHero from "../components/TagCategoryHero/TagCategoryHero";
import CategoryHeroList from "../components/CategoryHeroList/CategoryHeroList";
import { getCategoryHero } from "../redux/heroes/heroesSlice";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const HeroCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { error, categoryHeroes } = useSelector((state) => ({
    ...state.heroes,
  }));

  React.useEffect(() => {
    if (category) {
      dispatch(getCategoryHero(category));
    }

    error && toast.error(error);
  }, [dispatch, error, category]);

  return (
    <Layout>
      <TagCategoryHero />
      <CategoryHeroList heroes={categoryHeroes} />
    </Layout>
  );
};

export default HeroCategory;
