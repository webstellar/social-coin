import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import Loader from "../layout/Loader";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  myAppreciations,
  deleteAppreciation,
  clearErrors,
} from "../../actions/appreciationActions";
import { DELETE_APPRECIATION_RESET } from "../../constants/appreciationConstant";
import { toast, ToastContainer } from "react-toastify";

const MyAppreciations = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, appreciations } = useSelector(
    (state) => state.myAppreciations
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.appreciation
  );

  useEffect(() => {
    dispatch(myAppreciations(params.id));

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
  }, [dispatch, error, deleteError, isDeleted, navigate, params.id]);
  /*
  const deleteAppreciationHandler = (id) => {
    dispatch(deleteAppreciation(id));
  };

  */

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

    appreciations.forEach((appreciation) => {
      data.rows.push({
        id: appreciation?._id,
        hero: appreciation?.name,
        summary: appreciation?.summary.substring(0, 20),
        actions: (
          <Fragment>
            <Link
              to={`/admin/appreciation/${appreciation?._id}`}
              className="btn btn-Primary py-1 px-2"
            >
              <BsPencil />
            </Link>
            <button className="rounded-pill btn-danger py-1 px-2 ml-2">
              <BsTrash />
            </button>
          </Fragment>
        ),
      });
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container>
            <MDBDataTable
              data={setAppreciations()}
              className="px-3"
              bordered
              striped
              hover
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
