import { Flex, Heading, Stack, Switch, Text } from "@chakra-ui/react";
import { useSettings } from "../hooks";
import { getTitle } from "../utils";
import { LIST_TYPE_KEY, ResourceType } from "../constants";

export const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <title>{getTitle("Settings")}</title>
      <Stack gap={"1.5em"}>
        <Heading>Settings</Heading>
        <Stack gap={"1em"}>
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
                  Object.values(ResourceType).forEach((resourceType) => {
                    localStorage.setItem(
                      `${LIST_TYPE_KEY}_${resourceType}`,
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

          <Flex align={"center"} justify={"space-between"}>
            <Text color={"fg.muted"} fontSize={"sm"}>
              In dark mode, should PDFs invert their colors to appear dark?
            </Text>
            <Switch.Root
              checked={settings.darkModeInvertsPdfColors}
              onCheckedChange={({ checked }) => {
                updateSettings({ darkModeInvertsPdfColors: checked });
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
