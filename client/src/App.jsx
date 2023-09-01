import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import Spinner from "./components/Spinner";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading && <Spinner />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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