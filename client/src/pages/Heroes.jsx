import * as React from "react";
import LayoutHero from "../components/LayoutHero/LayoutHero";
import { useDispatch, useSelector } from "react-redux";
import { getHeroesWithParams } from "../redux/heroes/heroesSlice";
import HeroCard from "../components/HeroCard/HeroCard";
import Seo from "../components/Seo/Seo";

const Heroes = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = React.useState("");
  const [skip, setSkip] = React.useState(0);

  const { heroes } = useSelector((state) => ({ ...state.heroes }));

  React.useEffect(() => {
    dispatch(getHeroesWithParams({ keyword, skip }));
  }, [dispatch, keyword, skip]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight) {
      setSkip(heroes?.length);
    }
  };

  const scrollToEnd = () => {
    setSkip(heroes?.length);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  console.log(skip);

  return (
    <LayoutHero>
      <div >
        {heroes &&
          heroes.map((hero) => <HeroCard key={hero._id} hero={hero} />)}
      </div>
    </LayoutHero>
  );
};
export default Heroes;
