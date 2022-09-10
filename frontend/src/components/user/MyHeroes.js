import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Container } from "react-bootstrap";
import { BsThreeDotsVertical, BsPencil, BsTrash } from "react-icons/bs";

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
  const [actions, setActions] = useState(null);

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
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Country",
          field: "country",
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

    heroes.forEach((hero, index) => {
      data.rows.push({
        sno: <p>{index + 1}</p>,
        profile: ( 
          <img
            src={hero?.profilePicture.url}
            alt='hero image'
            style={{ width: '48px', height: '48px' }}
            className='rounded-circle'
          />),
        name: <p>{hero?.name}</p>,
        description: <p>{hero?.description}</p>,
        country: <p>{hero?.country}</p>,
        date: <p>{new Date(hero?.createdAt).toDateString().slice(4,)}</p>,
        actions: (
          <div style={{position:"relative"}} onMouseLeave={() => {setActions(null)}} >
            <div 
              style={{textAlign: "center"}} 
              onClick={() => setActions(index===actions ? null : index)}>
              <BsThreeDotsVertical/>
            </div>
            <div style={{ zIndex: 100, width: "100%", position: "absolute", display: actions===index ? "flex" : "none", flexDirection: "column" }}>
              <Link
              to={`/hero/${hero?._id}`}
              className="btn btn-Primary py-1 px-2"
              >
                <BsPencil />
              </Link>
              <button onClick={() => deleteHeroHandler(hero?._id)} className="rounded-pill btn btn-danger py-1 px-2 ml-2">
                <BsTrash />
              </button>
            </div>
          </div>
        )
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
              data={setHeroes()}
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
