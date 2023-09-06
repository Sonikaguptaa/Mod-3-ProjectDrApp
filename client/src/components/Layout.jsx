import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { message, Badge } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
// import { userMenu } from "../data/data";
// import { adminMenu } from "../data/data";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Logout function
  const handleLogout = () => {
    dispatch(setUser());

    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // ===============Doctor Menu================
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: " fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];



  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "fa-solid fa-user",
    // },
  ];

  // admin menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "fa-solid fa-user",
    },
  ];




  //=================Doctor Menu================

  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;

  // console.log('Location Pathname:', location.pathname);

  return (
    <>
      <div className="p-10 h-screen">
        <div className="flex">
          <div className="min-h-full w-80 rounded-lg bg-gray-500 shadow-md mr-20 text-white">
            <div className="logo h-20 text-center">
              <h6 className="text-2xl p-5 mt-4">Dr. Appt</h6>
              <hr className="mt-5  border-gray-300" />
            </div>
            <div className="menu m-4 p-5 space-y-3">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                const itemStyle = isActive ? { backgroundColor: "darkGray", padding: "4px" } : {};
                // const linkStyle = isActive ? { color: "blue" } : {};
                return (


                  <div className="p-1"
                    key={menu.path}
                    style={itemStyle}
                  >

                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                );
              })}
              <div className="menu-item " onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content w-full h-screen">
            <div className="header h-16 mb-5 shadow-md bg-white flex items-center justify-end pr-8">
              <div className="cursor-pointer">
                <Badge
                  className=""
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate('/notification');
                  }}
                >
                  <i className="fa-sharp fa-solid fa-bell text-xl"></i>
                </Badge>
                <Link to='/profile' className="text-blue-800 p-3">
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="body flex-2 mb-5 shadow-md bg-white p-8 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;