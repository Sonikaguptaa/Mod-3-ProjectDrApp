import { useEffect } from "react";
import React from "react";


import { useNavigate } from "react-router-dom";



export default function LoginRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return localStorage.getItem("token") ? null : children;
}