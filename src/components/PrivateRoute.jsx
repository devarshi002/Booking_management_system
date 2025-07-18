import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
