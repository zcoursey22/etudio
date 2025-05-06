import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ColorModeProvider } from "./components/chakra/color-mode";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { AuthProvider } from "./components/auth/AuthProvider.tsx";

const system = createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      // html: {
      //   colorPalette: "pink",
      // },
      "html[data-theme='dark']": {
        background: "var(--chakra-colors-black)",
        color: "var(--chakra-colors-white)",
      },
    },
    theme: {
      tokens: {
        colors: {},
      },
    },
  })
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ChakraProvider value={system}>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
