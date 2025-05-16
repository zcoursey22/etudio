import { Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { useClampedLocalStorage } from "../../hooks";
import { useState } from "react";
import { LuMinus, LuPause, LuPlay, LuPlus, LuRefreshCcw } from "react-icons/lu";
import { PomodoroTimerProgressCircle } from "./PomodoroTimerProgressCircle";

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    workDuration: { min: 5, initial: 25, max: 90 },
    breakDuration: { min: 1, initial: 5, max: 30 },
    sets: { min: 1, initial: 4, max: 12 },
  };

export const Pomodoro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [workDuration, setWorkDuration] = useClampedLocalStorage(
    "etudio_pomodoro_workDuration",
    config.workDuration.initial,
    config.workDuration.min,
    config.workDuration.max
  );
  const [breakDuration, setBreakDuration] = useClampedLocalStorage(
    "etudio_pomodoro_breakDuration",
    config.breakDuration.initial,
    config.breakDuration.min,
    config.breakDuration.max
  );
  const [sets, setSets] = useClampedLocalStorage(
    "etudio_pomodoro_sets",
    config.sets.initial,
    config.sets.min,
    config.sets.max
  );

  return (
    <Stack>
      <Flex justify={"center"}>
        <PomodoroTimerProgressCircle value={30} isPlaying={isPlaying}>
          <Flex
            direction={"column"}
            align={"space-between"}
            justify={"center"}
            flex={"1"}
            p={"1em"}
            gap={"1"}
          >
            <Flex align={"center"} justify={"space-between"} gap={"1"}>
              <IconButton
                variant={"ghost"}
                size={"2xs"}
                rounded={"full"}
                asChild
                padding={"0.25em"}
              >
                <LuMinus />
              </IconButton>
              <Flex align={"baseline"} gap={"1"}>
                <Heading color={"fg"} size={"3xl"}>
                  {workDuration}
                </Heading>{" "}
                mins
              </Flex>
              <IconButton
                variant={"ghost"}
                size={"2xs"}
                rounded={"full"}
                asChild
                padding={"0.25em"}
              >
                <LuPlus />
              </IconButton>
            </Flex>

            <Flex align={"center"} justify={"space-between"} gap={"1"}>
              <IconButton
                variant={"ghost"}
                size={"2xs"}
                rounded={"full"}
                asChild
                padding={"0.25em"}
              >
                <LuMinus />
              </IconButton>
              <Flex align={"baseline"} gap={"1"}>
                <Heading color={"fg"} size={"3xl"}>
                  {breakDuration}
                </Heading>{" "}
                mins
              </Flex>
              <IconButton
                variant={"ghost"}
                size={"2xs"}
                rounded={"full"}
                asChild
                padding={"0.25em"}
              >
                <LuPlus />
              </IconButton>
            </Flex>
          </Flex>
        </PomodoroTimerProgressCircle>
      </Flex>

      <Flex align={"center"} justify={"space-between"} gap={"1"}>
        <IconButton
          variant={"ghost"}
          color={"red.fg"}
          onClick={() => setIsPlaying(false)}
          asChild
          padding={"0.25em"}
        >
          <LuRefreshCcw />
        </IconButton>

        <Flex align={"center"} justify={"space-between"} flex={"1"}>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
          >
            <LuMinus />
          </IconButton>
          <Flex align={"baseline"} gap={"0"}>
            <Heading color={"fg"}>{sets}</Heading>x
          </Flex>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
          >
            <LuPlus />
          </IconButton>
        </Flex>

        <IconButton
          variant={"ghost"}
          color={isPlaying ? "orange.fg" : "green.fg"}
          onClick={() => setIsPlaying(!isPlaying)}
          asChild
          padding={"0.25em"}
        >
          {isPlaying ? (
            <LuPause fill={"currentcolor"} />
          ) : (
            <LuPlay fill={"currentcolor"} />
          )}
        </IconButton>
      </Flex>
    </Stack>
  );
};
