import Layout from "../components/Layout/Layout";
import AboutHero from "../components/AboutHero/AboutHero";
import AboutProfile from "../components/AboutProfile/AboutProfile";
import Seo from "../components/Seo/Seo";

const About = () => {
  return (
    <>
      <Layout>
        <AboutHero />
        <AboutProfile />
      </Layout>
    </>
  );
};
export default About;
