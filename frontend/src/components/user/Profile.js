import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, Navbar, Nav, Tabs, Tab } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ProfileTab from "./ProfileTab";
import MyHeroes from "./MyHeroes";
import MyAppreciations from "./MyAppreciations";
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
                    className="btn btn-dark rounded-pill px-4"
                  >
                    <BsPlus />
                    APPRECIATE
                  </button>
                </Nav>
              </Container>
            </Navbar>
            <Tabs
              defaultActiveKey="my-profile"
              id="uncontrolled-tab-example"
              className="mb-lg-5"
            >
              <Tab
                eventKey="myappreciation"
                title="My Appreciations"
                className="sc-tab"
              >
                <MyAppreciations />
              </Tab>
              <Tab eventKey="myheroes" title="My Heroes" className="sc-tab">
                <MyHeroes />
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
