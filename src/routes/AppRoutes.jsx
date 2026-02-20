import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import AdminPanel from "../features/admin/pages/AdminPanel";
import Subscription from "../features/subscription/pages/Subscription";
import Reports from "../features/reports/pages/Reports";
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

      {/* Dashboard - Any logged-in user */}
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

      {/* Reports - PRO + ENTERPRISE */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute requiredPlans={["PRO", "ENTERPRISE"]}>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Subscription - Any logged-in user */}
      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Subscription />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin - ADMIN only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={["ADMIN"]}>
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Predictive - ADMIN + ENTERPRISE */}
      <Route
        path="/predictive"
        element={
          <ProtectedRoute
            requiredRoles={["ADMIN"]}
            requiredPlans={["ENTERPRISE"]}
          >
            <MainLayout>
              <div className="p-6">Predictive Insights Page</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= SYSTEM ROUTES ================= */}

      <Route path="/forbidden" element={<Forbidden />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
