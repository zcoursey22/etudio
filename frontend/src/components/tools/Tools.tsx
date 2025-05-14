import { Accordion, Group, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { LuGauge, LuHourglass } from "react-icons/lu";
import { TbMetronome } from "react-icons/tb";
import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import { Metronome } from "./Metronome";
import { Pomodoro } from "./Pomodoro";
import { Tuner } from "./Tuner";

interface ToolItemConfig {
  value: string;
  label: string;
  element?: ReactNode;
  icon?: ReactNode;
}

const tools: ToolItemConfig[] = [
  {
    value: "metronome",
    label: "Metronome",
    icon: <TbMetronome />,
    element: <Metronome />,
  },
  {
    value: "pomodoro",
    label: "Pomodoro",
    icon: <LuHourglass />,
    element: <Pomodoro />,
  },
  { value: "tuner", label: "Tuner", icon: <LuGauge />, element: <Tuner /> },
];

const KEY = "etudio__open_tools";

export const Tools = () => {
  const [openTools, setOpenTools] = useLocalStorage<string[]>(KEY, []);

  return (
    <Stack gap={"0"}>
      <Heading>Tools</Heading>
      <Accordion.Root
        multiple
        value={openTools}
        onValueChange={({ value }) => setOpenTools(value)}
      >
        {tools.map(({ value, label, icon, element }) => {
          const isOpen = openTools.includes(value);
          return (
            <Accordion.Item key={value} value={value}>
              <Accordion.ItemTrigger cursor={"pointer"}>
                <Group flex={"1"}>
                  {icon && (
                    <Icon color={isOpen ? "green.fg" : "fg.subtle"}>
                      {icon}
                    </Icon>
                  )}
                  <Text>{label}</Text>
                </Group>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody color={"fg.muted"}>
                  {element}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </Stack>
  );
};
