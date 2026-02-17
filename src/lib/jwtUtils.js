export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    console.error("Invalid token");
    return null;
  }
};
