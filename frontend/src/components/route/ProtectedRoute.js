import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/userAction";

const ProtectedRoute = ({ children, isAdmin }) => {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user, isAuthenticated, loading]);

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      //navigate to previous menu
      //location.reload();
      navigate(-1);
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
