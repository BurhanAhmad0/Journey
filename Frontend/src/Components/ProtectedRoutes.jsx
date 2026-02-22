import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Api/AuthContext.jsx";

const ProtectedRoutes = () => {
  const { user, loadingUser } = useAuth();

  return (
    <div>
      {loadingUser ? (
        <div>Loading...</div>
      ) : user ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default ProtectedRoutes;
