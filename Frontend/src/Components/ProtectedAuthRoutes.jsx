import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Api/AuthContext.jsx";

const ProtectedAuthRoutes = () => {
  const { user, loadingUser } = useAuth();

  return (
    <div>
      {loadingUser ? (
        <div>Loading...</div>
      ) : !user ? (
        <Outlet />
      ) : (
        <Navigate to={`/@${user?.username}`} />
      )}
    </div>
  );
};

export default ProtectedAuthRoutes;
