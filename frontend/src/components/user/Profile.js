import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, Navbar, Nav, Tabs, Tab } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ProfileTab from "./ProfileTab";
import MyHeroes from "./MyHeroes";
import MyAppreciations from "./MyAppreciations";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`My Profile`} />
          <Container>
            <Navbar bg="none" className="mb-5">
              <Container>
                <h2 className="fw-bolder">Dashboard</h2>
                <Nav>
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill px-3 me-3"
                  >
                    <Link
                      to="/hero/new"
                      className="text-light text-decoration-none"
                    >
                      <BsPlus />
                      APPRECIATE
                    </Link>
                  </button>
                </Nav>
              </Container>
            </Navbar>
            <Tabs
              defaultActiveKey="my-profile"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="myheroes" title="Heroes" className="sc-tab">
                <MyHeroes />
              </Tab>
              <Tab
                eventKey="myappreciation"
                title="Appreciations"
                className="sc-tab"
              >
                <MyAppreciations user={user} />
              </Tab>
              <Tab eventKey="my-profile" title="My Profile" className="sc-tab">
                <ProfileTab user={user} />
              </Tab>
            </Tabs>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
