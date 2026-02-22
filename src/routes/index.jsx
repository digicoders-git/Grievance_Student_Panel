import { Routes, Route, Navigate } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Grievances from "../pages/Grievances";
import AddGrievance from "../pages/AddGrievance";
import GrievanceDetails from "../pages/GrievanceDetails";
import OfficerProfile from "../pages/OfficerProfile";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import NotFound from "../pages/NotFound";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard Layout with Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-grievances" element={<Grievances />} />
        <Route path="/add-grievance" element={<AddGrievance />} />
        <Route path="/grievance/:id" element={<GrievanceDetails />} />
        <Route path="/officer-profile" element={<OfficerProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
