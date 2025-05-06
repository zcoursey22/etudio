import { createContext } from "react";

type IAuthContext = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
