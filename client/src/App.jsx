import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/loginRoute";
import Spinner from "./components/Spinner";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && <Spinner />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <LoginRoute>
              <Register />
            </LoginRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />

      </Routes>


    </>
  );
}

export default App;