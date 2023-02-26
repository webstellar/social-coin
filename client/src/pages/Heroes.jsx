import * as React from "react";
import LayoutHero from "../components/LayoutHero/LayoutHero";
import { useDispatch, useSelector } from "react-redux";
import { getMoreHeroes } from "../redux/heroes/heroesSlice";
import HeroCard from "../components/HeroCard/HeroCard";
import Seo from "../components/Seo/Seo";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Typography, Button } from "@mui/material";
import { Spinner } from "../components/Spinner/Spinner";

const Heroes = () => {
  const dispatch = useDispatch();
  const [skip, setSkip] = React.useState(0);

  const limit = 12;

  const { loadedHeroes, heroesCount, loading } = useSelector((state) => ({
    ...state.heroes,
  }));

  React.useEffect(() => {
    dispatch(getMoreHeroes(skip));
  }, [dispatch, skip]);

  const handleLoadMore = () => {
    const skipTo = skip + limit;
    dispatch(getMoreHeroes(skipTo));
    setSkip(skipTo);
  };

  if (loading) <Spinner />;

  return (
    <LayoutHero>
      <div>
        {loadedHeroes &&
          loadedHeroes.map((hero) => <HeroCard key={hero._id} hero={hero} />)}
      </div>
      <div>
        {heroesCount === loadedHeroes.length ? (
          <Typography variant="h5" gutterBottom>
            You have reached the end
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            endIcon={<AutorenewIcon />}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    </LayoutHero>
  );
};
export default Heroes;
