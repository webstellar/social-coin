import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Container, Row } from "react-bootstrap";
import Hero from "../heroes/hero/Hero";
import Loader from "../layout/Loader";
import ErrorBoundary from "../../ErrorBoundary";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../actions/heroActions";
import { ToastContainer, toast } from "react-toastify";
import heroImg from "../../images/hero.svg";
import discoverImg from "../../images/discover.svg";
import honorImg from "../../images/honor.svg";
import boardImg from "../../images/board.svg";
import memorialImg from "../../images/memorial.svg";
import DiscoverSearchBar from "../layout/DiscoverSearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, heroes, error, heroesCount } = useSelector(
    (state) => state.heroes
  );

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    if (!keyword) {
      dispatch(getHeroes());
    } else {
      dispatch(getHeroes(keyword));
    }
  }, [dispatch, keyword, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Hero appreciation app"} />
          <Container>
            <div className="w-100 col-xxl-8 mb-5">
              <div className="row flex-lg-row-reverse align-items-center g-5 pb-5">
                <div className="col-6 col-sm-12 col-md-12 col-lg-6">
                  <img
                    src={heroImg}
                    className="d-block mx-lg-auto img-fluid"
                    alt="hero image"
                    width="700"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="col-6 col-lg-6 col-sm-12 col-md-12">
                  <h1 className="display-5 fw-bold lh-sm mb-3">
                    Say something to the ones who changed your life immensely.
                  </h1>
                  <p className="lead">
                    Let everyone know about the person who contributed immensely
                    to your growth and was always there for you.
                  </p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button
                      type="button"
                      className="rounded-pill btn btn-dark btn-lg px-4 me-md-2"
                    >
                      Appreciate your hero
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container-fluid w-100 col-xxl-8 py-5 mb-5"
              style={{ backgroundColor: "rgb(228, 228, 228, 0.2" }}
            >
              <h2 className="display-5 fw-bold text-center lh-sm mb-5">
                Discover how social coin works
              </h2>

              <div className="row align-items-center g-5 pb-5">
                <div className="col-6 col-sm-12 col-lg-6">
                  <img
                    src={discoverImg}
                    className="d-block mx-lg-auto img-fluid"
                    alt="hero image"
                    width="500"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="col-6 col-lg-6 col-sm-12 col-md-12">
                  <h2 className="display-6 fw-bold lh-sm mb-3">
                    Apprecial that special one
                  </h2>
                  <p className="lead">
                    Begin a Memorial Board in honor of a loved one. Attach
                    messages, photos, and videos to the online memorial
                  </p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button
                      type="button"
                      className="rounded-pill btn btn-dark btn-lg px-4 me-md-2"
                    >
                      Appreciate your hero
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 col-xxl-8 mb-2">
              <div className="row flex-lg-row-reverse align-items-center g-5">
                <div className="col-6 col-sm-12 col-lg-6">
                  <img
                    src={honorImg}
                    className="d-block mx-lg-auto img-fluid"
                    alt="hero image"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="col-4 col-lg-4 col-md-12 col-sm-12">
                  <p className="lead">
                    Begin a Memorial Board in honor of a loved one. Attach
                    messages, photos, and videos to the online memorial
                  </p>
                </div>
              </div>
            </div>

            <div className="w-100 col-xxl-8 mb-2">
              <div className="row align-items-center g-5">
                <div className="col-4 col-sm-12 col-md-12 col-lg-4">
                  <img
                    src={memorialImg}
                    className="d-block mx-lg-auto img-fluid"
                    alt="hero image"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="col-4 col-lg-4 col-sm-12 col-md-12">
                  <p className="lead">
                    Begin a Memorial Board in honor of a loved one. Attach
                    messages, photos, and videos to the online memorial
                  </p>
                </div>
              </div>
            </div>

            <div className="w-100 col-xxl-8 mb-5">
              <div className="row flex-lg-row-reverse align-items-center g-5">
                <div className="col-6 col-sm-12 col-md-12 col-lg-6">
                  <img
                    src={boardImg}
                    className="d-block mx-lg-auto img-fluid"
                    alt="hero image"
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="col-4 col-lg-4 col-sm-12 col-md-12">
                  <p className="lead">
                    Begin a Memorial Board in honor of a loved one. Attach
                    messages, photos, and videos to the online memorial
                  </p>
                </div>
              </div>
            </div>

            <div className="container-fluid w-100 col-xxl-8 py-5 mb-5">
              <h2 className="display-5 fw-bold text-center lh-sm mb-5">
                Discover latest appreciations
              </h2>

              <DiscoverSearchBar />
            </div>

            <Row sm={3} md={6}>
              <ErrorBoundary>
                {heroes &&
                  heroes
                    .filter((hero) => hero.appreciations.length >= 1)
                    .map((hero) => <Hero key={hero._id} hero={hero} />)}
              </ErrorBoundary>
            </Row>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
