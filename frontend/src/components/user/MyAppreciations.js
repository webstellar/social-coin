import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container } from "react-bootstrap";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  myAppreciations,
  deleteMyAppreciation,
  clearErrors,
} from "../../actions/appreciationActions";
import { DELETE_APPRECIATION_RESET } from "../../constants/appreciationConstant";
import { toast, ToastContainer } from "react-toastify";
import { Parser } from "html-to-react";

const MyAppreciations = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [actions, setActions] = useState(null);

  const { loading, error, appreciations, heroes } = useSelector(
    (state) => state.appreciations
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.appreciation
  );

  useEffect(() => {
    dispatch(myAppreciations());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("your hero was deleted successfully");
      navigate("/me");
      dispatch({ type: DELETE_APPRECIATION_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);


  const deleteAppreciationHandler = (id) => {
    dispatch(deleteMyAppreciation(id));
  };

  const setAppreciations = () => {
    const data = {
      columns: [
        {
          label: "",
          field: "sno",
          sort: "asc",
        },
        {
          label: "",
          field: "profile",
          sort: "asc",
        },
        {
          label: "Summary",
          field: "summary",
          sort: "asc",
        },
        {
          label: "Story",
          field: "story",
          sort: "asc",
        },
        {
          label: "Tags",
          field: "tags",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: " ",
          field: "actions",
        },
      ],

      rows: [],
    };

    appreciations.forEach((appreciation, index) => {
      data.rows.push({
        sno: <p>{index+1}</p>,
        profile: (
          <img
          src={"https://res.cloudinary.com/dja7mdaul/image/upload/v1660414223/social-coin/user_avatar/gciffgyqjmrotaq0qjn7.jpg"}
          alt='hero image'
          style={{ width: '48px', height: '48px' }}
          className='rounded-circle'
          />), 
        story: Parser().parse(appreciation.story),
        user: <p>{appreciation?.user.name}</p>,
        summary: <p>{appreciation?.summary.substring(0, 20)}</p>,
        tags: <p>{appreciation?.tags.join(' ')}</p>,
        date: <p>{new Date(appreciation?.createdAt).toDateString().slice(4,)}</p>,
        actions: 
        (
          <div style={{position:"relative"}} onMouseLeave={() => {setActions(false)}} >
            <div 
              style={{textAlign: "center"}} 
              onClick={() => setActions(index===actions ? null : index)}>
              <BsThreeDotsVertical/>
            </div>
            <div style={{ zIndex: 100, width: "100%", position: "absolute", display: actions===index ? "flex" : "none", flexDirection: "column" }}>
              <Link
              to={`/appreciation/${appreciation?._id}`}
              className="btn btn-Primary py-1 px-2"
              >
                <BsPencil />
              </Link>
              <button onClick={() => deleteAppreciationHandler(appreciation?._id)} className="rounded-pill btn btn-danger py-1 px-2 ml-2">
                <BsTrash />
              </button>
            </div>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container style={{ marginTop: "62px" }}>
            <MDBDataTable 
              className="px-3" hover 
              noBottomColumns={true} 
              searching={false}
              paging={false}
              info={false}
              data={setAppreciations()} 
            />
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

export default MyAppreciations;
