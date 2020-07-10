export const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};

export const setAuthToken = async token => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("authToken", token);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
