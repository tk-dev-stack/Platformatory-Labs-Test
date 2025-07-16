export const auth = {
  isAuthenticated: () => !!localStorage.getItem("token"),
  login: (cb: () => void) => {
    localStorage.setItem("token", "dummy-token");
    cb();
  },
  logout: (cb: () => void) => {
    localStorage.removeItem("token");
    cb();
  },
};