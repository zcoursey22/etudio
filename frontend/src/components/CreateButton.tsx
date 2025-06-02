import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export const CreateButton = () => {
  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      <Menu.Trigger asChild>
        <Button
          mb={"0.5em"}
          variant={"solid"}
          colorPalette={"gray"}
          onClick={() => {
            console.log("Create");
          }}
          disabled
        >
          <LuPlus /> New
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="goal">Goal</Menu.Item>
            <Menu.Item value="routine">Routine</Menu.Item>
            <Menu.Item value="composition">Composition</Menu.Item>
            <Menu.Item value="score">Score</Menu.Item>
            <Menu.Item value="supplementary">Supplementary</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="artist">Artist</Menu.Item>
            <Menu.Item value="source">Source</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
