export const storage = {
  getToken: () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      return null;
    }
    return token;
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  getOrgId: () => {
    return localStorage.getItem("orgId");
  },

  setOrgId: (orgId) => {
    if (orgId) {
      localStorage.setItem("orgId", orgId);
    }
  },

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("orgId");
  },
};
