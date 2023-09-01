import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/user/getUserData', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      console.log("getuser")

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        console.log("setuser")
      } else {
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect")
    if (!user) {
      console.log("useEffect true")
      getUser();
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [user, navigate]);

  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;