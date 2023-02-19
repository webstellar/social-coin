import * as React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
//import Seo from "../components/Seo/Seo";
import MyHeroList from "../components/MyHeroList/MyHeroList";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyHeroesList = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DashboardLayout>
      <MyHeroList />
      {user?.user?._id ? (
        <Link to={`/create-hero`}>
          <Fab
            sx={{ position: "fixed", bottom: "5%", right: "5%" }}
            aria-label="edit"
            color="secondary"
          >
            <AddIcon />
          </Fab>
        </Link>
      ) : null}
    </DashboardLayout>
  );
};
export default MyHeroesList;
