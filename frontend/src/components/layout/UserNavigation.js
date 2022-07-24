import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../route/ProtectedRoute";
import HeaderNav from "../layout/HeaderNav";
import FooterNav from "../layout/FooterNav";

import Home from "../pages/Home";
import Discover from "../pages/Discover";
import FAQs from "../pages/FAQs";
import HelpCenter from "../pages/HelpCenter";
import Donate from "../pages/Donate";
import ContactUs from "../pages/ContactUs";

import HeroDetails from "../heroes/hero/HeroDetails";
import AppreciationDetails from "../appreciations/AppreciationDetails";
import ShareAppreciations from "../appreciations/ShareAppreciations";

import Register from "../user/Register";
import Login from "../user/Login";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../user/ForgotPassword";
import NewPassword from "../user/NewPassword";

import Dashboard from "../admin/Dashboard";
import HeroesList from "../admin/HeroesList";
import AppreciationsList from "../admin/AppreciationsList";
import UsersList from "../admin/UsersList";
import NewAdminHero from "../admin/NewAdminHero";
import NewAdminAppreciation from "../admin/NewAdminAppreciation";
import NewUserHero from "../user/NewUserHero";
import NewUserAppreciation from "../user/NewUserAppreciation";

import { LinkedInCallback } from "react-linkedin-login-oauth2";

const UserNavigation = () => {
  return (
    <BrowserRouter>
      <HeaderNav />
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
        <Route path="/hero/new" element={<NewUserHero />} />
        <Route path="/appreciation/new" element={<NewUserAppreciation />} />
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

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <FooterNav />
    </BrowserRouter>
  );
};

export default UserNavigation;
