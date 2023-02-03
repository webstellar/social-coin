import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/Seo";
import GratitudeHero from "../components/GratitudeHero/GratitudeHero";
import GratitudeSubSection from "../components/GratitudeSubSection/GratitudeSubSection";
import GratitudeMainSection from "../components/GratitudeMainSection/GratitudeMainSection";
import GratitudeCommentSection from "../components/GratitudeCommentSection/GratitudeCommentSection";

import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getGratitude } from "../redux/gratitudes/gratitudeSlice";
import { toast } from "react-toastify";

const Gratitude = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, appreciation } = useSelector((state) => ({
    ...state.gratitude,
  }));

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getGratitude(id));
    }

    error && toast.error(error);
  }, [dispatch, error, id]);

  return (
    <>
      <Layout sx={{ position: "relative" }}>
        <GratitudeHero gratitude={appreciation} />
        <GratitudeSubSection gratitude={appreciation} />
        <GratitudeMainSection gratitude={appreciation} />
        <GratitudeCommentSection gratitude={appreciation} id={id} />
        {user ? (
          <Link to={`/edit/appreciation/${id}`}>
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
    </>
  );
};
export default Gratitude;
