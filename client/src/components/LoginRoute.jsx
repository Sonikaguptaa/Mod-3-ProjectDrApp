import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return localStorage.getItem("token") ? null : children;
};

export default LoginRoute;