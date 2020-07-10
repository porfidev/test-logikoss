export const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};

export const setAuthToken = async (token, tokenType = "") => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("tokenType", tokenType);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("authToken");
  const tokenType = localStorage.getItem("tokenType");
  return { authToken, tokenType };
};

export const deleteAuthToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenType");
}
