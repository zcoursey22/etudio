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

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ChakraProvider value={system}>
          <ColorModeProvider>{children}</ColorModeProvider>
        </ChakraProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};
