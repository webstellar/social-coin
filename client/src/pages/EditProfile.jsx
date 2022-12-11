import * as React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
//import Seo from "../components/Seo/Seo";
import ChangePassword from "../components/ChangePassword/ChangePassword";

const EditProfile = () => {
  return (
    <DashboardLayout>
      <ChangePassword />
    </DashboardLayout>
  );
};
export default EditProfile;
