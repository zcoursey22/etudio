import { useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import { useAuth } from "./hooks";
// import { ColorMode, useColorMode } from "./components";

export const App = () => {
  const { isAuthenticated } = useAuth();
  // const { setColorMode } = useColorMode();
  // const hour = new Date().getHours();
  // const theme: ColorMode = hour >= 19 || hour < 6 ? "dark" : "light";
  // setColorMode(theme);
  // window.document.documentElement.setAttribute("data-theme", theme);

  return useRoutes(getRoutes(isAuthenticated));
};
