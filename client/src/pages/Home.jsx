import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/Seo";
import HomeHero from "../components/HomeHero/HomeHero";
import HomeHeroCategory from "../components/HomeHeroCategory/HomeHeroCategory";


const Home = () => {
  return (
    <>
      <Layout>
        <HomeHero />
        <HomeHeroCategory />
      </Layout>
    </>
  );
};
export default Home;
