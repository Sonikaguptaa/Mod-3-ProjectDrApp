import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import Spinner from "./components/Spinner";
import ApplyDoctors from "./pages/ApplyDoctors";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";


function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && <Spinner />}
      <Routes>







        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />




        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginRoute>
          <Login />  </LoginRoute>} />

        <Route path="/register" element={<LoginRoute>
          <Register /> </LoginRoute>} />


        <Route path="/appointments" element={<ProtectedRoute>
          <Appointments />  </ProtectedRoute>} />

        <Route path="doctor-appointments" element={<ProtectedRoute>
          <DoctorAppointments />  </ProtectedRoute>} />


        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />


      </Routes>
    </>
  );
}

export default App;