import { Accordion, Heading, Stack } from "@chakra-ui/react";
import { LuAlarmClock, LuGauge } from "react-icons/lu";
import { TbMetronome } from "react-icons/tb";
import { ToolItem, ToolItemProps } from "./ToolItem";

const tools: ToolItemProps[] = [
  { value: "metronome", label: "Metronome", icon: TbMetronome },
  { value: "stopwatch", label: "Stopwatch", icon: LuAlarmClock },
  { value: "tuner", label: "Tuner", icon: LuGauge },
];

export const Tools = () => {
  return (
    <Stack gap={"0"}>
      <Heading>Tools</Heading>
      <Accordion.Root multiple>
        {tools.map((tool) => (
          <ToolItem {...tool} />
        ))}
      </Accordion.Root>
    </Stack>
  );
};
