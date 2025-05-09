import { Flex, Heading, Stack, Switch, Text } from "@chakra-ui/react";
import { useSettings } from "../hooks";

export const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <Stack>
      <Heading pb={"0.5em"}>Settings</Heading>
      <Stack>
        <Heading size={"md"}>Display</Heading>
        <Flex align={"center"} justify={"space-between"}>
          <Text color={"fg.muted"} fontSize={"sm"}>
            Keep selected view type synced across all lists
          </Text>
          <Switch.Root
            checked={settings.syncListViewType}
            onCheckedChange={({ checked }) =>
              updateSettings({ syncListViewType: checked })
            }
            colorPalette={"blue"}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
        </Flex>
      </Stack>
    </Stack>
  );
};
