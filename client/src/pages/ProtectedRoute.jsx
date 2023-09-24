import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastStyle = {
  style: {
    border: "1px solid #b91604",
    padding: "8px",
    color: "#b91604",
    fontSize: "14px",
  },
  iconTheme: {
    primary: "#b91604",
    secondary: "#FFFAEE",
  },
  duration: 2000,
};

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("memberId");
  const location = useLocation();

  if (!user) {
    localStorage.setItem("prevPath", location.pathname); // 이전 경로 저장
    toast.error("로그인이 필요한 서비스입니다.", toastStyle);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
