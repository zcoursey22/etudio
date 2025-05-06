import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const KEY = "etudio_isAuthenticated";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(KEY) === "true"
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(KEY, "true");
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(KEY, "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
