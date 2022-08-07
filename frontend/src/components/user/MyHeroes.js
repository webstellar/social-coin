import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myHeroes, deleteHero, clearErrors } from "../../actions/heroActions";
import { DELETE_HERO_RESET } from "../../constants/heroConstant";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../layout/Loader";

//TODO Create getUserHeroes reducer, controller, action

const MyHeroes = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, heroes } = useSelector((state) => state.heroes);
  const { error: deleteError, isDeleted } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(myHeroes());

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
      dispatch({ type: DELETE_HERO_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const deleteHeroHandler = (id) => {
    dispatch(deleteHero(id));
  };

  const setHeroes = () => {
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
          label: "Gender",
          field: "gender",
          sort: "asc",
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "No of Appreciation",
          field: "appreciationsCount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    heroes.forEach((hero) => {
      data.rows.push({
        id: hero?._id,
        name: hero?.name,
        gender: hero?.gender,
        country: hero?.country,
        email: hero?.email,
        appreciationsCount: hero?.appreciations.length,
        actions: (
          <Fragment>
            <Link
              to={`/me/hero/${hero?._id}`}
              className="btn btn-Primary py-1 px-2"
            >
              <BsPencil />
            </Link>
            <button onClick={() => deleteHeroHandler(hero?._id)} className="rounded-pill btn-danger py-1 px-2 ml-2">
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
            <MDBDataTable
              data={setHeroes()}
              className="px-3"
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

export default MyHeroes;
