/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ErrorBoundary from "../../ErrorBoundary";
import jwt_decode from "jwt-decode";
import Linkedin from "../../images/linkedin.svg";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  clearErrors,
  login,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import { useScript } from "../hooks/useScript";
import { LinkedInApi } from "../config/linkedinConfig";

const Register = () => {
  const confirmPassword = useRef();
  const newPassword = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [linkedinUser, setLinkedinUser] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const { name, email, password } = user;

  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    "https://picsum.photos/200"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (newPassword.current.value === confirmPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid isValid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid isInvalid");
      }
    }
  };

  //Google Signup
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_decode(userCred);
    console.log(payload)
    let userData = {
      name: payload.name,
      email: payload.email,
      profilePicture: payload.picture,
      googleId: payload.sub,
    };

    dispatch(login( "google", userData));
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signUpDiv"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signup_with",
        context: "signup",
        width: "400",
        logo_alignment: "center",
      }
    );

    //window.google.accounts.id.prompt();
  });


  //Email Signup
  useEffect(() => {
    if (isCPasswordDirty) {
      if (newPassword.current.value === confirmPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }

    if (isAuthenticated) {
      navigate("/hero/new");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, isCPasswordDirty]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    formData.set("profilePicture", profilePicture);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "profilePicture") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePicturePreview(reader.result);
          setProfilePicture(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const showLinkedinPopup = () => {
    let { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    oauthUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    window.open(oauthUrl,"_self")
  };

  const signupLinkedin = async () => {
    const url = window.location.href;
    if(url.includes("code=") && url.includes("state=")){
      const code = url.split("code=")[1].split("&")[0]
      dispatch(login("linkedin", { code }));
      toast.success("Logged in successfully.");
      navigate("/me");
    }; 
  }

  // For LinkedIn only  
  useEffect(() => {
    const url = window.location.href;
    if(url.includes("code=") && url.includes("state=")){
      const code = url.split("code=")[1].split("&")[0]
      if(authCode!==code && linkedinUser===null)
        signupLinkedin();
    }    
  },[])
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ErrorBoundary>
            <MetaData title={"Signup/Register"} />
            <Container>
              <Row className="justify-content-center">
                <Col xs={6} md={4} className="mb-5">
                  <h2 className="pw-bolder text-center">sign up</h2>
                  <div className="mt-5 sc-logincontrol">
                    <Form
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname_field">
                          full name
                        </Form.Label>
                        <Form.Control
                          required
                          type="name"
                          className="sc-disablefocus rounded-pill border-dark"
                          name="name"
                          value={name}
                          onChange={onChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="email_field">
                          email address
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          className="sc-disablefocus rounded-pill border-dark"
                          name="email"
                          value={email}
                          onChange={onChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password_field">
                          password
                        </Form.Label>
                        <Form.Control
                          required
                          type="password"
                          className="sc-disablefocus rounded-pill border-dark"
                          name="password"
                          value={password}
                          ref={newPassword}
                          onChange={onChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password_field">
                          confirm password
                        </Form.Label>
                        <Form.Control
                          required
                          type="Password"
                          className={`${cPasswordClass} sc-disablefocus rounded-pill border-dark`}
                          name="password"
                          ref={confirmPassword}
                          onChange={checkPasswords}
                        />

                        <Form.Text>
                          {showErrorMessage && isCPasswordDirty ? (
                            <div> Passwords did not match </div>
                          ) : (
                            ""
                          )}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="profilePicture_field">
                          profile picture
                        </Form.Label>
                        <Row>
                          <Col sm="2">
                            <figure className="figure">
                              <img
                                src={profilePicturePreview}
                                className="figure-img img-fluid rounded-circle"
                                alt="profile preview"
                                style={{ width: 30, height: 30 }}
                              />
                            </figure>
                          </Col>
                          <Col sm="10">
                            <Form.Control
                              required
                              type="file"
                              className="sc-disablefocus rounded-pill border-dark"
                              accept="images/*"
                              name="profilePicture"
                              onChange={onChange}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check
                          required
                          type="checkbox"
                          label={`confirm that you accept our terms of uses, privacy policy and cookies policy`}
                          style={{ fontSize: "11px" }}
                        />
                      </Form.Group>
                      <div className="d-grid gap-2">
                        <Button
                          type="submit"
                          className="rounded-pill btn-dark btn-outline-light border-dark"
                          disabled={loading ? true : false}
                        >
                          sign up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-5 mb-5">
                      <hr />
                    </div>

                    <div
                      className="d-grid gap-2 mb-3 signUpDiv"
                      id="signUpDiv"
                    ></div>

                    <div className="d-grid gap-2 mb-3">
                      <Button
                        className="sc-disablefocus rounded-pill btn-labeled btn-light btn-outline-dark"
                        onClick={showLinkedinPopup}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={Linkedin}
                          alt="Sing up with LinkedIn"
                          style={{ width: 18, height: 18 }}
                          className="pe-1"
                        />
                        sign up with LinkedIn
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </ErrorBoundary>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
