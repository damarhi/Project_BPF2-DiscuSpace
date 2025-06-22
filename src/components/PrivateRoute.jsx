
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Privateroute() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
