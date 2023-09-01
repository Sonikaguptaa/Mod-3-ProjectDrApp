import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  //get user
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/getUserData',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(setUser(res.data.data))
      } else {
        <Navigate to='/login' />
        localStorage.clear();
      }

    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      console.log(error)
    }
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [user, getUser],
    []);
  return localStorage.getItem("token") ? children : null;
}

