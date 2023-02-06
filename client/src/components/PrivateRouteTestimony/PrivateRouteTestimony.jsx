import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatusForTestimony } from "../../hooks/useAuthStatus";
import { Spinner } from "../Spinner/Spinner";

const PrivateRouteTestimony = () => {
  const { loggedIn, checkingStatus } = useAuthStatusForTestimony();

  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouteTestimony;
