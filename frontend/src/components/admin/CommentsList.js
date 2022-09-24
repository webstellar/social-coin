import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import AdminSideBar from "./AdminSideBar";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminAppreciations,
  deleteComment,
  clearErrors,
} from "../../actions/appreciationActions";
import { DELETE_APPRECIATION_RESET } from "../../constants/appreciationConstant";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";

const CommentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [actions, setActions] = useState(null);

  const { loading, error, appreciations } = useSelector(
    (state) => state.appreciations
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.appreciation
  );

  useEffect(() => {
    const getAppreciationList = async () => {
      dispatch(getAdminAppreciations());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Comment deleted successfully");
      navigate("/admin/comments");
      dispatch({ type: DELETE_APPRECIATION_RESET });
    }

    getAppreciationList();

  }, [dispatch, deleteError, isDeleted, navigate, error]);

  const setAppreciations = () => {
    const data = {
      columns: [
        {
          label: "Hero",
          field: "hero",
          sort: "asc",
        },
        {
          label: "Appreciation Title",
          field: "appreciationTitle",
          sort: "asc",
        },
        {
          label: "Commenter",
          field: "commenter",
          sort: "asc",
        },
        
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    appreciations.forEach((appreciation) => {
      if(appreciation.comments){
        let participants = null;
        participants = appreciation.comments.participants.reduce((obj, item) => {
            return {
              ...obj,
              [item['userId']]: item,
            };
          }, {})
        appreciation.comments.conversation.map((ele) => {
          data.rows.push({
            hero: (
              <img
                src={appreciation.hero.profilePicture}
                alt='hero image'
                style={{ width: '48px', height: '48px' }}
                className='rounded-circle'
              />),
            appreciationTitle: appreciation?.summary.slice(0,10),
            commenter: participants[ele.userId].userName,
            comment: ele.comment,
            date: new Date(ele.postedDate).toDateString().slice(4,),
            actions: (
              <button 
                onClick={() => deleteCommentHandler(ele?._id, appreciation._id)} 
                className="rounded-pill btn btn-danger py-1 px-2 ml-2">
                <BsTrash />
              </button>
            )
            
          });
        })
      }
    });

    return data;
  };

  const deleteCommentHandler = (commentId, appId) => {
    dispatch(deleteComment(commentId, appId));
  };

  return (
    <Fragment>
      <MetaData title={"All Appreciations"} />
      <Container>
        <Row>
          <Col xs={4} md={2}>
            <AdminSideBar />
          </Col>
          <Col>
            <Fragment>
              <h1 className="my-5">All Comments</h1>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setAppreciations()}
                  className="px-3 mt-2"
                  noBottomColumns={true} 
                  searching={false}
                  info={false}
                  paging={false}
                  bordered
                  striped
                  hover
                />
              )}
            </Fragment>
          </Col>
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
  );
};

export default CommentsList;
