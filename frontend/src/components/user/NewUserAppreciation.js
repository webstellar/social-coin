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

const NewUserAppreciation   () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { heroes } = useSelector((state) => state.heroes);

  const data = location.state?.data._id;

  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState("");
  const [story, setStory] = useState("");
  const [hero, setHero] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState(["daring"]);
  const [video, setVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/dja7mdaul/image/upload/v1655345210/social-coin/user_avatar/defaultProfile_ouwetk.jpg"
  );
  const [validated, setValidated] = useState(false);

  const { loading, error, success, appreciation } = useSelector(
    (state) => state.newAppreciation
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);

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
  }, [dispatch, error, success, appreciation, navigate]);

  useEffect(() => {
    if (hero === "" && heroes && heroes.length > 0) {
      setHero(heroes[0]._id);
    }
  }, [heroes]);

  //tinymce editor
  const storyChange = (story, editor) => {
    if (editor.getContent({ format: "text" }).length < 2000) {
      setStory(story);
    }
  };

  //images
  const onChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      const file = e.target.files[0];
      if (file > 8e6) {
        alert("Max Limit is: 8mb");
        return;
      }
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  //video
  const onUpload = async (e) => {
    var file = e.target.files[0];
    if (file.size > 2.5e7) {
      alert("Max Limit is: 25mb");
      return;
    }
    var POST_URL =
      "https://api.cloudinary.com/v1_1/" +
      process.env.REACT_APP_YOUR_CLOUD_NAME +
      "/auto/upload";

    var XUniqueUploadId = +new Date();

    setUploading(true);
    await processFile();
    async function processFile(e) {
      console.log("inside");
      var size = file.size;
      var sliceSize = 20000000;
      var start = 0;

      setTimeout(loop, 3);

      async function loop() {
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = slice(file, start, end);
        await send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    async function send(piece, start, end, size) {
      console.log("start ", start);
      console.log("end", end);

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", process.env.REACT_APP_YOUR_CLOUD_NAME);
      formdata.append(
        "upload_preset",
        process.env.REACT_APP_YOUR_UNSIGNED_UPLOAD_PRESET
      );
      formdata.append("folder", "social-coin/appreciations/videos");

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        const result = JSON.parse(this.responseText);
        console.log(this.responseText);
        console.log({ public_id: result.public_id, url: result.url });
        setVideo({ public_id: result.public_id, url: result.url });
        setUploading(false);
      };

      await xhr.send(formdata);
    }

    function slice(file, start, end) {
      var slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }

    function noop() {}
  };

  //remove tags
  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  //tags
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formdata = {
        hero: data || hero,
        summary: summary,
        story: story,
        image: image === "" ? null : image,
        video: video,
        tags: tags,
      };
      console.log(formdata);
      dispatch(newAppreciation(formdata));
    }
    setValidated(true);
  };

  const tinymce = "0z5qmo7cx8rjieka6xxb9nz2y1b8k8rdyluiq9zv9r0t6du2";

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
                      noValidate
                      validated={validated}
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname_field">hero</Form.Label>
                        {!data && (
                          <Form.Select
                            className="sc-disablefocus rounded-pill border-dark"
                            value={hero._id}
                            onChange={(e) => {
                              console.log(e);
                              setHero(e.target.value);
                            }}
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
                          required
                          as="textarea"
                          rows={3}
                          maxLength={150}
                          type="text"
                          className="sc-disablefocus rounded border-dark"
                          value={summary}
                          spellCheck="true"
                          onChange={(e) => {
                            setSummary(e.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          field cannot be empty
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="description_field">
                          story
                        </Form.Label>
                        <Editor
                          apiKey={tinymce}
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
                        <Form.Label htmlFor="tag_field">tags</Form.Label>
                        <div className="border border-1 rounded p-2 tags-input-container">
                          {tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                              <span className="text">{tag}</span>
                              <span
                                className="close"
                                onClick={() => {
                                  removeTag(index);
                                }}
                              >
                                &times;
                              </span>
                            </div>
                          ))}

                          <input
                            onKeyDown={handleKeyDown}
                            type="text"
                            name="tags"
                            className="tags-input"
                            placeholder="Type something"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="image_field">
                          upload your hero's banner
                        </Form.Label>
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

                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>upload a video</Form.Label>
                        <Form.Control
                          type="file"
                          className="sc-disablefocus rounded-pill border-dark"
                          name="video"
                          onChange={onUpload}
                        />
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button
                          type="submit"
                          className="rounded-pill btn-dark btn-outline-light border-dark"
                          disabled={loading || uploading ? true : false}
                        >
                          {loading || uploading ? "uploading..." : "appreciate"}
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
