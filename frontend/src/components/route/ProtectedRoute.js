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
  console.log("before",loading, isAuthenticated)
  if (!loading) {
    if(!isAuthenticated) { 
      if(!window.location.href.includes("/login"))
        navigate("/login") 
    }
    else{
      if (isAdmin === true){
        if(user && user.role === "admin") {
          return children;
        }
        else navigate(-1);
      } 
      else {
        return children;
      }
    }
  }
};

export default ProtectedRoute;
