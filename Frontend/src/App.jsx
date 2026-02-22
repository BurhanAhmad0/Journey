import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./Layouts/Layout.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import NotFound from "./Pages/NotFound.jsx";

import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";
import ProtectedAuthRoutes from "./Components/ProtectedAuthRoutes.jsx";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedAuthRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/:username" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
