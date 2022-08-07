import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
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

const MyAppreciations = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Hero",
          field: "hero",
          sort: "asc",
        },
        {
          label: "Appreciator",
          field: "user",
          sort: "asc",
        },
        {
          label: "Summary",
          field: "summary",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    appreciations.forEach((appreciation, i) => {
      data.rows.push({
        id: appreciation?._id,
        hero: appreciation.hero,
        user: appreciation?.user,
        summary: appreciation?.summary.substring(0, 20),
        actions: (
          <Fragment>
            <Link
              to={`/me/appreciation/${appreciation?._id}`}
              className="btn btn-Primary py-1 px-2"
            >
              <BsPencil />
            </Link>
            <button onClick={() => deleteAppreciationHandler(appreciation?._id)} className="rounded-pill btn btn-danger py-1 px-2 ml-2">
              <BsTrash />
            </button>
          </Fragment>
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
          <Container>
            <MDBDataTable data={setAppreciations()} className="px-3" hover />
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
