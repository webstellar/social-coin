import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Image, Badge } from "react-bootstrap";
import ErrorBoundary from "../../ErrorBoundary";
import Loader from "../layout/Loader";
import MetaData from "../../components/layout/MetaData";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";
import Banner from "../../images/banner-test.jpg";
import AppreciationDetailsSideBarBottom from "./AppreciationDetailsSideBarBottom";

import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppreciationDetails,
  clearErrors,
} from "../../actions/appreciationActions";

import { toast, ToastContainer } from "react-toastify";
import { Parser } from "html-to-react";
import { Player } from "video-react";
import { shareOnLinkedIn, shareOnFacebook } from "../../utils/SocialShare";
import { BsHandThumbsDownFill, BsHandThumbsUpFill, BsPersonFill } from "react-icons/bs";
import { TextField } from "@mui/material"

const comment_feature_seperator = { 
  background: "rgba(108, 100, 100, 1)",
  borderRadius: "3px",
  height: "3px", width: "3px", 
  margin: "5.5%", marginRight: "2.5%"
}
const comment_feature_label = {
  color: "rgba(108,100,100,1)",
  cursor: "pointer",
  fontFamily: "cursive",
  whiteSpace: "nowrap"
}

const cm = [{replies: 1},{replies: 2},{replies: 2}]

const AppreciationDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [participants, setParticipants] = useState(null);

  const { loading, error, appreciation } = useSelector(
    (state) => state.appreciationDetails
  );

  const getSeparatorComponent = () => (
    <div style={{margin: "6.5% 4% 0% 4%"}}>
      <div style={comment_feature_seperator} />
    </div>
  )
  const getAvatarComponent = (profilePic, isReply) => (
    <div>
    { profilePic ? 
      <img style={{    
        borderRadius: "50%",
        width: isReply ? "42px" : "50px",
        height: isReply ? "42px" : "50px"
      }} 
      src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png"/> 
      : 
      <BsPersonFill style={{
        fontSize: isReply ? "2.625em" : "3em",
        background: "bisque",
        borderRadius: "50%",
        padding: "15%",
      }} />
    }
    </div>
  )
  const getSubmitCommentComponent = () => (
    <div style={{display: 'flex'}}>
      {getAvatarComponent()}
      <TextField
        sx = {{ marginLeft: "2%"}}
        id="outlined-multiline-flexible"
        label="Comment"
        multiline
        maxRows={4}
        fullWidth
        placeholder="Add a comment..."
      />
    </div>
  )
  const getCommentComponent = (review, isReply=false) => {
    const sc_user =  participants[review.userId];
    return (
    <div style={{marginTop: isReply ? "10%" : "3%"}}>
      <div style={{display:'flex'}}>
        {getAvatarComponent(sc_user.profilePic, isReply)}
        <div style={{marginLeft: isReply ? "8%" : "2.5%"}}>
          <div style={{display: 'flex'}}>
            <span>{sc_user.userName}</span> 
            <div style={{ background: "rgba(108, 100, 100, 1)", height: "6px", width: "6px", borderRadius: "6px", margin: "5.5%", marginRight: "2.5%"}} />
            <span style={{fontSize: "0.8em", marginTop: "1.5%"}}>{'1h'}</span>
          </div>
          <p style={{whiteSpace: 'nowrap', marginBottom: 0}}>{ isReply ? review.reply : review.comment}</p>
          <div> 
            <div style={{display:'flex'}}> 
              <p style={comment_feature_label} className="mb-0">{ isReply || review.replies.length < 0 ? `Reply` : `Show all ${review.replies.length} replies`}</p>
              {getSeparatorComponent()}
              {review.status.likes > 0 && <p style={comment_feature_label} className="mb-0">{`${ review.status.likes.length } Likes`}</p>} 
              {getSeparatorComponent()}
              <div>
                <BsHandThumbsUpFill style={{ color: review.status.likes.includes(review.userId) ? 'blue' : "rgba(108, 100, 100, 1)" }} />
              </div> 
              <div style={{ marginLeft: "5%" }}>
                <BsHandThumbsDownFill 
                  style={{ color: review.status.dislikes.includes(review.userId) 
                    ? 'blue' : "rgba(108, 100, 100, 1)" 
                  }} 
                />
              </div>
            </div>
            {
              review.replies.length > 0 && 
                review.replies.map((sc_reply) => {
                  getCommentComponent(sc_reply, true)
              })
            }
          </div>
        </div>
      </div>
    </div>
  )}

  useEffect(() => {
    
    dispatch(getAppreciationDetails(params.id));
    if(appreciation.comments) {
      let tmp = {}
      appreciation.comments.participants.reduce((obj, item) => {
        return {
          ...obj,
          [item['userId']]: item,
        };
      }, tmp)
      setParticipants({...tmp})
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error, params.id]);
  console.log(appreciation)
  let shareUrl = window.location.href;

  const apprDate = dayjs(appreciation.createdAt).format("MMM D, YYYY");
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData
            title={`${appreciation.summary}`}
            description={`${appreciation.story}`}
            image={`${appreciation.image?.url}`}
          />
          <Container>
            <ErrorBoundary>
              <Row>
                <Col sm={8} className="hero-details-col pe-5">
                  <Navbar className="justify-content-start mb-5">
                    <Navbar.Brand as={Link} to="/">
                      <img
                        src={
                          appreciation.user?.profilePicture.url
                            ? appreciation.user.profilePicture.url
                            : "https://picsum.photos/200"
                        }
                        alt="mdo"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    </Navbar.Brand>
                    <Navbar.Brand>
                      <span className="fw-bold" style={{ fontSize: "18px" }}>
                        {appreciation.user?.name
                          ? appreciation.user.name
                          : "Social-Coin User"}
                      </span>
                      <span className="d-flex" style={{ fontSize: "12px" }}>
                        {apprDate}
                      </span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end sc-appreciation-icon">
                      <div>
                        <button 
                            onClick = {shareOnFacebook}
                            className="pe-2"
                            style={{ background: "transparent", border: "none"}}
                          >
                            <FacebookIcon size={25} round />
                        </button>
                        <TwitterShareButton
                          title={appreciation.summary}
                          url={`${shareUrl}`}
                          hashtags={["appreciation", "socialcoin"]}
                          className="pe-2"
                        >
                          <TwitterIcon size={25} round />
                        </TwitterShareButton>
                        <button 
                          onClick = {shareOnLinkedIn}
                          className="pe-2"
                          style={{ background: "transparent", border: "none"}}
                        >
                          <LinkedinIcon size={25} round />
                        </button>
                        <EmailShareButton
                          subject={appreciation.summary}
                          body={appreciation.story}
                        >
                          <EmailIcon size={25} round />
                        </EmailShareButton>
                      </div>
                    </Navbar.Collapse>
                  </Navbar>
                  <div>
                    <h1 className="fw-bolder fs-4 mb-4">
                      {appreciation.summary}
                    </h1>
                    <div className="mb-4">
                      {appreciation.image ? (
                        <Image
                          src={appreciation.image.url}
                          style={{ width: "800px", height: "500px" }}
                          className="img-fluid"
                        />
                      ) : (
                        <Image
                          src={Banner}
                          style={{ width: "800px", height: "500px" }}
                          className="img-fluid"
                        />
                      )}
                    </div>
                    <p className="mb-4">{Parser().parse(appreciation.story)}</p>

                    <div className="mb-3">
                      {
                        appreciation.tags &&
                        appreciation.tags.map((tag, i) => { 
                          return (
                            <><Badge pill bg="dark" key={i}>
                              {tag}
                            </Badge>&nbsp;</>
                          )}
                        )
                      }
                    </div>

                    <div>
                      {appreciation.video ? (
                        <Player>
                          <source src={appreciation.video?.url} />
                        </Player>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <br/><hr/>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{margin: 0}}>{`The Conversation (${5})`}</p>                
                    <div>
                      <label style={{ color: "rgba(108, 100, 100, 1)" }} htmlFor="sort-options">Sort By</label>&nbsp;
                      <select style={{border: 'none'}} name="sort-options" id="sort-options">
                        <option value="Best">Best</option>
                        <option value="Hot">Hot</option>
                      </select>
                    </div>
                  </div>
                  <p style={{margin: 0, fontSize: "0.8em"}}>Start a discussion, not a fire, Post with kindness.</p>
                  <hr/>
                  
                  <div>
                    {getSubmitCommentComponent()}
                    { JSON.stringify(appreciation)!=='{}' && 
                      appreciation.comments.conversation.map((review) => (
                        getCommentComponent(review)
                      ))
                    }
                  </div>
                </Col>
                <Col sm={4} className="ps-5">
                  <AppreciationDetailsSideBarBottom />
                </Col>
              </Row>
            </ErrorBoundary>
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

export default AppreciationDetails;
