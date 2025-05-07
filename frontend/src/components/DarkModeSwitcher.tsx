import { IconButton, SegmentGroup } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { ColorMode, useColorMode } from "./chakra/color-mode";

export const DarkModeSwitcher = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <SegmentGroup.Root
      value={colorMode}
      onValueChange={(e) => setColorMode(e.value as ColorMode)}
      size={"md"}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        padding={0}
        cursor={"pointer"}
        items={[
          {
            value: "light",
            label: (
              <IconButton variant={"plain"} pointerEvents={"none"} size={"md"}>
                <LuSun />
              </IconButton>
            ),
          },
          {
            value: "dark",
            label: (
              <IconButton variant={"plain"} pointerEvents={"none"} size={"md"}>
                <LuMoon />
              </IconButton>
            ),
          },
        ]}
      />
    </SegmentGroup.Root>
  );
};
