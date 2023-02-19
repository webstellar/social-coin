import * as React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import UserProfileTestimony from "../components/UserProfileTestimony/UserProfileTestimony";
import UserProfile from "../components/UserProfile/UserProfile";
//import Seo from "../components/Seo/Seo";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardLayout>
      <UserProfile />
      <UserProfileTestimony />
      {user?.user?._id ? (
        <Link to={`/create-testimony`}>
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
export default UserDashboard;
