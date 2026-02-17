import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export default function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPlans = [],
}) {
  const { isAuthenticated, role, subscriptionPlan } = useAuth();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Plan restriction
  if (requiredPlans.length > 0 && !requiredPlans.includes(subscriptionPlan)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
