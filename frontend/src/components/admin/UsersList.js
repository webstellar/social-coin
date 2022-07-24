import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import AdminSideBar from "./AdminSideBar";
import ErrorBoundary from "../../ErrorBoundary";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import { toast, ToastContainer } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("your user was deleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "ProfilePicture",
          field: "profilePicture",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        profilePicture: user?.profilePicture,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user?._id}`}
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

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <Container>
        <ErrorBoundary>
          <Row>
            <Col xs={4} md={2}>
              <AdminSideBar />
            </Col>
            <Col>
              <h1 className="my-5">All Users</h1>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable data={setUsers()} className="px-3" hover />
              )}
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
        </ErrorBoundary>
      </Container>
    </Fragment>
  );
};

export default UsersList;
