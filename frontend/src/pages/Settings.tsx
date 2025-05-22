import { Flex, Heading, Stack, Switch, Text } from "@chakra-ui/react";
import { useSettings } from "../hooks";
import { getTitle } from "../utils";

export const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <title>{getTitle("Settings")}</title>
      <Stack>
        <Heading>Settings</Heading>
        <Stack>
          <Heading size={"md"}>Display</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Text color={"fg.muted"} fontSize={"sm"}>
              Keep the way you view lists synced across all pages
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
    </>
  );
};
