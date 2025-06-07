import { useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import { useAuth } from "./hooks";
import { pdfjs } from "react-pdf";
// import { ColorMode, useColorMode } from "./components";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const App = () => {
  const { isAuthenticated } = useAuth();
  // const { setColorMode } = useColorMode();
  // const hour = new Date().getHours();
  // const theme: ColorMode = hour >= 19 || hour < 6 ? "dark" : "light";
  // setColorMode(theme);
  // window.document.documentElement.setAttribute("data-theme", theme);

  return useRoutes(getRoutes(isAuthenticated));
};
