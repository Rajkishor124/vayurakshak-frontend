import { useState, useMemo } from "react";
import { decodeToken } from "../../lib/jwtUtils";
import { storage } from "../../lib/storage";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(storage.getToken());

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded) return null;

    return {
      orgId: decoded.orgId || decoded.org_id,
      role:
        decoded.role || decoded.authorities?.[0]?.replace("ROLE_", "") || null,
      subscriptionPlan: decoded.subscriptionPlan || decoded.plan || null,
    };
  }, [token]);

  const login = (authData) => {
    if (!authData?.token) return;

    storage.setToken(authData.token);
    setToken(authData.token);
  };

  const logout = () => {
    storage.clear();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        orgId: user?.orgId,
        role: user?.role,
        subscriptionPlan: user?.subscriptionPlan,

        // ✅ FIX: authentication must rely on token
        isAuthenticated: !!token,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
