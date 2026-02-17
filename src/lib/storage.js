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

  clear: () => {
    localStorage.removeItem("token");
  },
};
