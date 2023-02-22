import * as React from "react";
import LayoutHero from "../components/LayoutHero/LayoutHero";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../redux/heroes/heroesSlice";
import HeroCard from "../components/HeroCard/HeroCard";
import Seo from "../components/Seo/Seo";

const InstaHeroList = () => {
  const dispatch = useDispatch();
  const { heroes } = useSelector((state) => ({ ...state.heroes }));

  React.useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch]);

  return (
    <LayoutHero>
      {heroes && heroes.map((hero) => <HeroCard key={hero._id} hero={hero} />)}
    </LayoutHero>
  );
};
export default InstaHeroList;
