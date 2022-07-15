import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
} from "react-bootstrap";
import ErrorBoundary from "../../ErrorBoundary";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { Editor } from "@tinymce/tinymce-react";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  newAppreciation,
  clearErrors,
} from "../../actions/appreciationActions";
import { getHeroes } from "../../actions/heroActions";
import { NEW_APPRECIATION_RESET } from "../../constants/appreciationConstant";
import { toast, ToastContainer } from "react-toastify";

const NewUserAppreciation = () => {
  const [summary, setSummary] = useState("");
  const [story, setStory] = useState("");
  const [hero, setHero] = useState("");
  const [image, setImage] = useState("");
  //const [audio, setAudio] = useState("");
  //const [video, setVideo] = useState("");
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/dja7mdaul/image/upload/v1655345210/social-coin/user_avatar/defaultProfile_ouwetk.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data._id;

  const { loading, error, success, appreciation } = useSelector(
    (state) => state.newAppreciation
  );

  const { heroes } = useSelector((state) => state.heroes);

  useEffect(() => {
    dispatch(getHeroes());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate(`/share/appreciation/${appreciation._id}`);
      toast.success("Appreciation created successfully");
      dispatch({ type: NEW_APPRECIATION_RESET });
    }
  }, [dispatch, error, success, appreciation, navigate, hero]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("hero", hero);
    formData.set("summary", summary);
    formData.set("story", story);
    formData.set("image", image);
    //formData.set("audio", audio);
    //formData.set("video", video);

    dispatch(newAppreciation(formData));
  };

  const storyChange = (story) => {
    setStory(story);
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
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
          <MetaData title={"Appreciation your hero"} />
          <Container>
            <ErrorBoundary>
              <Row className="justify-content-center mb-5">
                <ul className="sc-progressbar">
                  <li className="active">
                    <Link
                      to="/hero/new"
                      className="active text-dark text-decoration-none"
                    >
                      name your hero
                    </Link>
                  </li>
                  <li className="active">appreciate your hero</li>
                  <li>share your appreciate</li>
                </ul>
              </Row>
              <Row className="justify-content-center">
                <Col md={4} className="mb-5">
                  <h2 className="pw-bolder text-center">
                    appreciate your hero
                  </h2>
                  <ListGroup variant="flush">
                    {heroes &&
                      heroes
                        .filter((hero) => hero._id === data)
                        .map((hero) => (
                          <ListGroup.Item className="sc-sidedarlink mb-1">
                            <Navbar className="justify-content-start">
                              <Navbar.Brand>
                                <img
                                  src={hero.profilePicture.url}
                                  alt={hero.name}
                                  width="80"
                                  height="80"
                                  className="rounded-circle me-2"
                                />
                              </Navbar.Brand>
                              <Navbar.Brand>
                                <span
                                  className="fw-bold"
                                  style={{ fontSize: "2rem" }}
                                >
                                  {hero.name}
                                </span>
                                <span
                                  className="d-flex"
                                  style={{ fontSize: "1rem" }}
                                >
                                  {hero.country}
                                </span>
                              </Navbar.Brand>
                            </Navbar>
                          </ListGroup.Item>
                        ))}
                  </ListGroup>

                  <div className="mt-5 sc-logincontrol">
                    <Form
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname_field">hero</Form.Label>
                        {data ? (
                          <Form.Select
                            className="sc-disablefocus rounded-pill border-dark"
                            value={hero._id}
                            onChange={(e) => setHero(e.target.value.toString())}
                          >
                            {heroes &&
                              heroes
                                .filter((hero) => hero._id === data)
                                .map((hero) => (
                                  <option key={hero._id} value={hero._id}>
                                    {hero.name}
                                  </option>
                                ))}
                          </Form.Select>
                        ) : (
                          <Form.Select
                            className="sc-disablefocus rounded-pill border-dark"
                            value={hero._id}
                            onChange={(e) => setHero(e.target.value)}
                          >
                            {heroes &&
                              heroes.map((hero) => (
                                <option key={hero._id} value={hero._id}>
                                  {hero.name}
                                </option>
                              ))}
                          </Form.Select>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname_field">
                          summary
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          type="text"
                          className="sc-disablefocus rounded border-dark"
                          value={summary}
                          onChange={(e) => {
                            setSummary(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="description_field">
                          story
                        </Form.Label>
                        <Editor
                          apiKey="0z5qmo7cx8rjieka6xxb9nz2y1b8k8rdyluiq9zv9r0t6du2"
                          value={story}
                          plugins="wordcount fullscreen"
                          init={{
                            height: 500,
                            menubar: false,
                          }}
                          onEditorChange={storyChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="image_field">image</Form.Label>
                        <Row>
                          <Col md="2">
                            <figure className="figure">
                              <img
                                src={imagePreview}
                                className="figure-img img-fluid rounded-circle"
                                alt="profile preview"
                                style={{ width: 30, height: 30 }}
                              />
                            </figure>
                          </Col>
                          <Col>
                            <Form.Control
                              type="file"
                              className="sc-disablefocus rounded-pill border-dark"
                              accept="images/*"
                              name="image"
                              onChange={onChange}
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button
                          type="submit"
                          className="rounded-pill btn-dark btn-outline-light border-dark"
                          disabled={loading ? true : false}
                        >
                          appreciate
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
            </ErrorBoundary>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewUserAppreciation;

/*

<Form.Group className="mb-3">
    <Form.Label htmlFor="audio_field">audio</Form.Label>
        <Form.Control
                          type="file"
                          className="sc-disablefocus rounded-pill border-dark"
                          accept="audio/*"
                          name="audio"
                          onChange={(e) => {
                            if (e.target.name === "audio") {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setAudio(reader.result);
                              };

                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
    />
</Form.Group>
<Form.Group className="mb-3">
    <Form.Label htmlFor="video_field">video</Form.Label>
                        <Form.Control
                          type="file"
                          className="sc-disablefocus rounded-pill border-dark"
                          accept="video/*"
                          name="video"
                          onChange={(e) => {
                            if (e.target.name === "video") {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setVideo(reader.result);
                              };

                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
    />
</Form.Group>


                      */
