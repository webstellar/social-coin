import { useEffect } from "react";
import WriteHero from "../components/WriterHero/WriterHero";
import Layout from "../components/Layout/Layout";
//import Seo from "../components/Seo/Seo";

import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getHero } from "../redux/heroes/heroSlice";
import { toast } from "react-toastify";

const Hero = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, hero } = useSelector((state) => ({
    ...state.hero,
  }));

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
     
      dispatch(getHero(id));
    }

    error && toast.error(error);
  }, [dispatch, error, id]);

  return (
    <Layout>
      <WriteHero hero={hero} />
      <Fab
        sx={{ position: "fixed", bottom: "15%", right: "5%" }}
        color="secondary"
        aria-label="add"
        onClick={() => {
          navigate("/create-testimony", {
            state: { data: hero?._id },
          });
        }}
      >
        <AddIcon />
      </Fab>

      {user && user?.user?._id === hero?.user ? (
        <Link to={`/edit/hero/${id}`}>
          <Fab
            sx={{ position: "fixed", bottom: "5%", right: "5%" }}
            aria-label="edit"
            color="secondary"
          >
            <EditIcon />
          </Fab>
        </Link>
      ) : null}
    </Layout>
  );
};

export default Hero;
