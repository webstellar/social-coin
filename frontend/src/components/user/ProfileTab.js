import React, { Fragment, useEffect } from "react";
import HeroAppreciationLink from "../heroes/hero/HeroAppreciationLink";

import { GoPrimitiveDot } from "react-icons/go";
import { ListGroup, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../actions/userAction";
import { getHeroes } from "../../actions/heroActions";

import goToLink from "../../images/goToLink.svg"
import { toast } from "react-toastify";

const ProfileTab = ({ user }) => {
  const dispatch = useDispatch();

  const { heroes, error } = useSelector((state) => state.heroes);

  useEffect(() => {
    dispatch(getHeroes());
  }, [dispatch, error]);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  return (
    <Fragment>
      <Container>
        <Row md={4} className="mb-5" style={{padding: "56px 45px 56px 0px", background: "rgba(217, 217, 217, 0.3)"}}>
            <div className="profile-img-container">
                <img 
                  className="profile-img"
                  alt={user && user.name}
                  src={user.profilePicture && user.profilePicture.url}
                />
            </div>
            <div className="profile-info">
              <div className="profile-left">
                  <p className="title">Full Name:</p>
                  <p className="title">Email:</p>
                  <p className="title">Phone:</p>
                  <p className="title">Update Profile:</p>
              </div>
              <div className="profile-right">
                  <p className="user-info">{user.name}</p>
                  <p className="user-info">{user.email}</p> 
                  <p className="user-info">{user.mobile ? user.mobile : "N/A"}</p>  
                  <a className="update-link" href="#"><img src={goToLink}></img></a> 
              </div>
            </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProfileTab;
