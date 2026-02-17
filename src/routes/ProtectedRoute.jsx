import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPlan,
}) {
  const { isAuthenticated, role, subscriptionPlan } = useAuth();

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // role restriction
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  // plan restriction
  if (requiredPlan && subscriptionPlan !== requiredPlan) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
