import React, { Fragment, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ErrorBoundary from "../../ErrorBoundary";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import data from "../../data.json";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newHero, clearErrors } from "../../actions/heroActions";
import { NEW_HERO_RESET } from "../../constants/heroConstant";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const NewUserHero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("Nigeria");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    "https://res.cloudinary.com/dja7mdaul/image/upload/v1655345210/social-coin/user_avatar/defaultProfile_ouwetk.jpg"
  );
  const [validated, setValidated] = useState(false);

  const genders = ["Male", "Female", "Others"];
  const countries = data;

  const { loading, error, hero, success } = useSelector(
    (state) => state.newHero
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/appreciation/new", { state: { data: hero } });
      toast.success("Hero created successfully");
      dispatch({ type: NEW_HERO_RESET });
    }
  }, [dispatch, error, success, hero, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("gender", gender);
      formData.set("country", country);
      formData.set("email", email);
      formData.set("linkedinUrl", linkedinUrl);
      formData.set("twitterUrl", twitterUrl);
      formData.set("instagramUrl", instagramUrl);
      formData.set("facebookUrl", facebookUrl);
      formData.set("profilePicture", profilePicture);

      dispatch(newHero(formData));
    }
    setValidated(true);
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
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Register a new hero"} />
          <ErrorBoundary>
            <Container>
              <Row className="justify-content-center mb-5">
                <ul className="sc-progressbar">
                  <li className="active">name your hero</li>
                  <li>
                    <Link
                      to="/appreciation/new"
                      className="text-dark text-decoration-none"
                    >
                      appreciate your hero
                    </Link>
                  </li>
                  <li>share your appreciate</li>
                </ul>
              </Row>
              <Row className="justify-content-center">
                <Col md={4} className="mb-5">
                  <h2 className="pw-bolder text-center">name your hero</h2>
                  <div className="mt-5 sc-logincontrol">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="fullname_field">
                          full name
                        </Form.Label>
                        <Form.Control
                          required
                          type="name"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="email_field">
                          email address
                        </Form.Label>
                        <Form.Control
                          required
                          type="email"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="description_field">
                          description
                        </Form.Label>
                        <Form.Control
                          required
                          maxLength={150}
                          as="textarea"
                          rows={3}
                          type="text"
                          className="sc-disablefocus rounded border-dark"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 px-0" as={Col}>
                        <Form.Label htmlFor="gender_option">gender</Form.Label>
                        <Form.Select
                          required
                          className="sc-disablefocus rounded-pill border-dark"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          {genders.map((gender) => (
                            <option key={gender} value={gender}>
                              {gender}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 px-0" as={Col}>
                        <Form.Label htmlFor="gender_option">country</Form.Label>
                        <Form.Select
                          required
                          className="sc-disablefocus rounded-pill border-dark"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="linkedinUrl_field">
                          linkedin Url
                        </Form.Label>
                        <Form.Control
                          type="url"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={linkedinUrl}
                          onChange={(e) => {
                            setLinkedinUrl(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="instagramUrl_field">
                          instagram Url
                        </Form.Label>
                        <Form.Control
                          type="url"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={instagramUrl}
                          onChange={(e) => {
                            setInstagramUrl(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="twitterUrl_field">
                          twitter Url
                        </Form.Label>
                        <Form.Control
                          type="url"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={twitterUrl}
                          onChange={(e) => {
                            setTwitterUrl(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 px-0" as={Col}>
                        <Form.Label htmlFor="facbeookUrl_field">
                          facebook Url
                        </Form.Label>
                        <Form.Control
                          type="url"
                          className="sc-disablefocus rounded-pill border-dark"
                          value={facebookUrl}
                          onChange={(e) => {
                            setFacebookUrl(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3 px-0">
                        <Form.Label htmlFor="profilePicture_field">
                          profile picture
                        </Form.Label>
                        <Row>
                          <Col md="2">
                            <figure className="figure">
                              <img
                                src={profilePicturePreview}
                                className="figure-img img-fluid rounded-circle"
                                alt="profile preview"
                                style={{ width: 30, height: 30 }}
                              />
                            </figure>
                          </Col>
                          <Col>
                            <Form.Control
                              required
                              type="file"
                              className="sc-disablefocus rounded-pill border-dark"
                              accept="images/*"
                              name="profilePicture"
                              onChange={onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              field cannot be empty
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                      <div className="d-flex justify-content-between">
                        <Button
                          type="submit"
                          className="w-100 rounded-pill btn-dark btn-outline-light border-dark me-2"
                          disabled={loading ? true : false}
                        >
                          {loading ? "Loading" : "next"}
                        </Button>
                        <Button
                          as={Link}
                          to="/appreciation/new"
                          variant="secondary"
                          className="w-50 rounded-pill"
                        >
                          skip
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Container>
          </ErrorBoundary>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewUserHero;
