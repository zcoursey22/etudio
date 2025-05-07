import { PropsWithChildren } from "react";
import useLocalStorage from "use-local-storage";
import { AuthContext } from "../contexts";

const KEY = "etudio_isAuthenticated";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(KEY, false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
