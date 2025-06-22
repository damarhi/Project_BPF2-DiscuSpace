// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Jika belum login, arahkan ke halaman login
  return user ? <Outlet /> : <Navigate to="/" replace />;
}
