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

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && <Spinner />}
      <Routes>
        <Route path="/register" element={<LoginRoute>
          <Register /> </LoginRoute>} />
        <Route path="/login" element={<LoginRoute>
          <Login />  </LoginRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
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
          path="/notification"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />


      </Routes>
    </>
  );
}

export default App;