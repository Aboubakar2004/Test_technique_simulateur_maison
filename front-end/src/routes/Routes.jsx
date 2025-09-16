import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profil from "../pages/Profile/Profile";
import Simulation from "../pages/Simulation/Simulation";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
