import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/auth.types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

/**
 * ProtectedRoute
 * Wraps private routes. Redirects unauthenticated users to /login,
 * and redirects users without the correct role to a 403-style fallback.
 * Usage in the router: <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
 */
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
