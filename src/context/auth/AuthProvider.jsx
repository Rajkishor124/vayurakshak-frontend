import { useState, useMemo } from "react";
import { decodeToken } from "../../lib/jwtUtils";
import { storage } from "../../lib/storage";
import { AuthContext } from "./AuthContext";

const getValidToken = () => {
  const token = storage.getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    storage.clear();
    return null;
  }

  const isExpired = decoded.exp * 1000 < Date.now();
  if (isExpired) {
    storage.clear();
    return null;
  }

  return token;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getValidToken);

  const login = (authData) => {
    if (!authData?.token) return;

    storage.setToken(authData.token);
    setToken(authData.token);
  };

  const logout = () => {
    storage.clear();
    setToken(null);
  };

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded) return null;

    const orgId = decoded.orgId || decoded.org_id;

    const rawRole = decoded.role || decoded.authorities?.[0] || null;

    const role = rawRole?.replace("ROLE_", "") || null;

    const subscriptionPlan = decoded.subscriptionPlan || decoded.plan || null;

    if (orgId) {
      storage.setOrgId(orgId);
    }

    return {
      orgId,
      role,
      subscriptionPlan,
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        orgId: user?.orgId,
        role: user?.role,
        subscriptionPlan: user?.subscriptionPlan,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
