import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../auth";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default AuthGuard;