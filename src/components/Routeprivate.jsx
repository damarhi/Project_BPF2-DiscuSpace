
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Routeprivate() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/error403" replace />; // arahkan ke landing jika bukan admin
  }

  return <Outlet />;
}
  

