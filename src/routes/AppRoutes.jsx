import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import AdminPanel from "../features/admin/pages/AdminPanel";
import Forbidden from "./Forbidden";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/auth/useAuth";

/**
 * Prevent logged-in users from visiting login/register pages
 */
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Enterprise Only Route */}
      <Route
        path="/predictive"
        element={
          <ProtectedRoute requiredRole="ADMIN" requiredPlan="ENTERPRISE">
            <MainLayout>
              <div className="p-6">Predictive Insights Page</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= SYSTEM ROUTES ================= */}

      <Route path="/forbidden" element={<Forbidden />} />

      {/* default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
