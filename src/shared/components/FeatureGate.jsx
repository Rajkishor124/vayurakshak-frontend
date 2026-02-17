import { useAuth } from "../../context/auth/useAuth";

export default function FeatureGate({
  children,
  requiredRole,
  requiredPlan,
  fallback = null,
  showLock = false,
}) {
  const { isAuthenticated, role, subscriptionPlan } = useAuth();

  // Not authenticated
  if (!isAuthenticated) {
    return fallback;
  }

  // Role restriction
  if (requiredRole && role !== requiredRole) {
    return fallback;
  }

  // Plan restriction
  if (requiredPlan && subscriptionPlan !== requiredPlan) {
    if (showLock) {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <span className="text-lg font-semibold">🔒 Upgrade Required</span>
          </div>
          <div className="opacity-50 pointer-events-none">{children}</div>
        </div>
      );
    }

    return fallback;
  }

  return children;
}
