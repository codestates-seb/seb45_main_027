import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("memberId");
  const location = useLocation();

  if (!user) {
    localStorage.setItem("prevPath", location.pathname); // 이전 경로 저장
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
