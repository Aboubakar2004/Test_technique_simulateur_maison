import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profil from "../pages/Profile/Profile";
import Simulation from "../pages/Simulation/Simulation";
import ProtectedRoute from "../components/ProtectedRoute";
import UnauthorizedRoute from "../components/UnauthorizedRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <UnauthorizedRoute>
              <Login />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthorizedRoute>
              <Signup />
            </UnauthorizedRoute>
          }
        />
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/simulation"
          element={
            <ProtectedRoute>
              <Simulation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
