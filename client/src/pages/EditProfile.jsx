import * as React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
//import Seo from "../components/Seo/Seo";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

const EditProfile = () => {
  return (
    <DashboardLayout>
      <ChangePassword />
      <UpdateProfile />
    </DashboardLayout>
  );
};
export default EditProfile;
