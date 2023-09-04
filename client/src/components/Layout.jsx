import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../data/data";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";
import { useDispatch } from "react-redux"
import { setUser } from "../redux/features/userSlice"

const Layout = ({ children }) => {

  const { user } = useSelector((state) => state.user)
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(user)

  //Logout function
  const handleLogout = () => {
    dispatch(setUser())

    localStorage.clear()
    message.success("Logout Successfully")
    navigate("/login")


  }

  // ===============Doctor Menu================

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: " fa-solid fa-house",
    },
    {
      name: "Appoinments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //=================Doctor Menu================


  // rendering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  return (
    <>

      <div className="p-10 h-screen">
        <div className="flex">
          <div className="min-h-full w-80 rounded-lg bg-gray-700 shadow-md mr-20 text-white">
            <div className="logo h-20 text-center">
              <h6 className="text-2xl">DOC APP</h6>
              <hr className="mt-2 border-gray-300" />
            </div>
            <div className="menu m-5 p-5 space-y-3">
              {SidebarMenu.map(menu => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item ${isActive ? "active" : ""}`} key={menu.name}>
                    <div className="flex items-center space-x-2">
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                );
              })}

              <div className={`menu-item`} onClick={handleLogout} >
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
                </div>
              </div>


            </div>
          </div>
          <div className="content w-full h-screen">
            <div className="header h-16 mb-5 shadow-md bg-white flex items-center justify-end pr-8">
              <div className="cursor-pointer">
                <Badge className="" count={user && user.notification.length} onClick={() => { navigate('/notification') }}>
                </Badge>
                <i className="fa-sharp fa-solid fa-bell text-xl"></i>
                <Link to='/profile' className="text-blue-800 p-3">{user?.name}</Link>
              </div>
            </div>
            <div className="body flex-1 mb-5 shadow-md bg-white p-8 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>


    </>



  );

};

export default Layout;
