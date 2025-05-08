import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { SettingsProvider } from "./SettingsProvider";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider } from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const system = createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      html: {
        colorPalette: "gray",
      },
      "label[data-scope='checkbox']": {
        cursor: "pointer",
      },
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

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={system}>
            <ColorModeProvider>{children}</ColorModeProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};
