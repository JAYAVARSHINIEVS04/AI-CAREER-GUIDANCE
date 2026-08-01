import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Careers from "../pages/Careers";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/careers" element={<Careers />} />

        {/* Student-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          {/* <Route path="/dashboard" element={<StudentDashboard />} /> */}
        </Route>

        {/* Admin-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
