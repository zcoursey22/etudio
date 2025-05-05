import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

export const App = () => {
  return useRoutes(routes);
};
