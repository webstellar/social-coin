import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import HeaderNav from "./components/layout/HeaderNav";
import FooterNav from "./components/layout/FooterNav";

import Home from "./components/pages/Home";
import Discover from "./components/pages/Discover";
import FAQs from "./components/pages/FAQs";
import HelpCenter from "./components/pages/HelpCenter";
import Donate from "./components/pages/Donate";
import ContactUs from "./components/pages/ContactUs";

import HeroDetails from "./components/heroes/hero/HeroDetails";
import AppreciationDetails from "./components/appreciations/AppreciationDetails";
import ShareAppreciations from "./components/appreciations/ShareAppreciations";

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Dashboard from "./components/admin/Dashboard";
import HeroesList from "./components/admin/HeroesList";
import AppreciationsList from "./components/admin/AppreciationsList";
import UsersList from "./components/admin/UsersList";
import NewAdminHero from "./components/admin/NewAdminHero";
import NewAdminAppreciation from "./components/admin/NewAdminAppreciation";
import NewUserHero from "./components/user/NewUserHero";
import NewUserAppreciation from "./components/user/NewUserAppreciation";

import { LinkedInCallback } from "react-linkedin-login-oauth2";

import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import store from "./store";
import { onMessageListener, requestForToken } from "./firebase";
import { toast, ToastContainer } from "react-toastify";
import CommentsList from "./components/admin/CommentsList";

function App() {
  const [notification, setNotification] = useState(null)
  
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (notification) {
      toast.info(notification.body);
    }
  }, [notification]);
  
  onMessageListener()
  .then((payload) => {
    console.log(payload)
    setNotification({title: payload?.notification?.title, body: payload?.notification?.body});    
  })
  .catch((err) => console.log('failed: ', err));

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    requestForToken();
  },[user])
  //const location = useLocation();


  return (
    <BrowserRouter>
      {Location.pathname !== "/dashboard" && <HeaderNav />}

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/hero/:id" element={<HeroDetails />} exact />
        <Route
          path="/appreciation/:id"
          element={<AppreciationDetails />}
          exact
        />
        <Route
          path="/share/appreciation/:id"
          element={<ShareAppreciations />}
          exact
        />
        <Route path="/linkedin" element={<LinkedInCallback />} exact />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/hero/new"
          element={
            <ProtectedRoute>
              <NewUserHero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appreciation/new"
          element={
            <ProtectedRoute>
              <NewUserAppreciation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appreciations"
          element={
            <ProtectedRoute isAdmin={true}>
              <AppreciationsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/heroes"
          element={
            <ProtectedRoute isAdmin={true}>
              <HeroesList />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<UsersList />} />
        <Route
          path="/admin/appreciation"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewAdminAppreciation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hero"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewAdminHero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/comments"
          element={
            <ProtectedRoute isAdmin={true}>
              <CommentsList />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      {Location.pathname !== "/dashboard" && <FooterNav />}
    </BrowserRouter>
  );
}

export default App;
