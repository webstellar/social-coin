import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import AdminSideBar from "./AdminSideBar";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminAppreciations,
  deleteAppreciation,
  clearErrors,
} from "../../actions/appreciationActions";
import { DELETE_APPRECIATION_RESET } from "../../constants/appreciationConstant";

const AppreciationsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, appreciations } = useSelector(
    (state) => state.appreciations
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.appreciation
  );

  useEffect(() => {
    dispatch(getAdminAppreciations());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Appreciation deleted successfully");
      navigate("/admin/appreciations");
      dispatch({ type: DELETE_APPRECIATION_RESET });
    }
  }, [dispatch, deleteError, isDeleted, navigate, error]);

  const deleteAppreciationHandler = (id) => {
    dispatch(deleteAppreciation(id));
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

    appreciations.forEach((appreciation) => {
      data.rows.push({
        id: appreciation?._id,
        hero: appreciation?.hero,
        user: appreciation?.user,
        summary: appreciation?.summary.substring(0, 20),
        actions: (
          <Fragment>
            <Link
              to={`/admin/appreciation/${appreciation?._id}`}
              className="btn btn-Primary py-1 px-2"
            >
              <BsPencil />
            </Link>
            <button className="rounded-pill btn btn-danger py-1 px-2 ml-2">
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
      <MetaData title={"All Appreciations"} />
      <Container>
        <Row>
          <Col xs={4} md={2}>
            <AdminSideBar />
          </Col>
          <Col>
            <Fragment>
              <h1 className="my-5">All Appreciations</h1>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setAppreciations()}
                  className="px-3"
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

export default AppreciationsList;
