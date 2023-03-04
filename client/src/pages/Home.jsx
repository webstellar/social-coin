import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/Seo";
import HomeHero from "../components/HomeHero/HomeHero";
import HomeRecentTitle from "../components/HomeRecentTitle/HomeRecentTitle";
import HomeHeroCategory from "../components/HomeHeroCategory/HomeHeroCategory";

const Home = () => {
  return (
    <>
      <Layout>
        <HomeHero />
        <HomeRecentTitle />
        <HomeHeroCategory />
      </Layout>
    </>
  );
};
export default Home;
