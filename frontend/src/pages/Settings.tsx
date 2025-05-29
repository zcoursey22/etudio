import { Flex, Heading, Stack, Switch, Text } from "@chakra-ui/react";
import { useSettings } from "../hooks";
import { getTitle } from "../utils";
import { LIST_TYPE_KEY, ListId } from "../constants";

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
              Sync the list viewing type (table or grid) of all resources?
            </Text>
            <Switch.Root
              checked={settings.syncListViewType}
              onCheckedChange={({ checked }) => {
                updateSettings({ syncListViewType: checked });
                if (!checked) {
                  Object.values(ListId).forEach((listId) => {
                    localStorage.setItem(
                      `${LIST_TYPE_KEY}_${listId}`,
                      localStorage.getItem(LIST_TYPE_KEY) || ""
                    );
                  });
                }
              }}
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
