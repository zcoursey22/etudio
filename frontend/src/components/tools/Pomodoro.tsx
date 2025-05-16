import { Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import { useClampedLocalStorage } from "../../hooks";
import { useEffect, useState } from "react";
import { LuMinus, LuPause, LuPlay, LuPlus, LuRefreshCcw } from "react-icons/lu";
import { PomodoroTimerProgressCircle } from "./PomodoroTimerProgressCircle";

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    workDuration: { min: 2, initial: 25, max: 90 },
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
  const [currentRep, setCurrentRep] = useState(1); // [1, sets * 2]
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);

  const start = () => {};

  const pause = () => {};

  const stop = () => {};

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  const [isPaused, setIsPaused] = useState(false);

  const isWorking = isPlaying && !!(currentRep % 2);

  return (
    <Stack>
      <Flex justify={"center"}>
        <PomodoroTimerProgressCircle
          value={30}
          isPlaying={isPlaying}
          isWorking={isWorking}
          isPaused={isPaused}
        >
          <Flex
            direction={"column"}
            align={"space-between"}
            justify={"center"}
            flex={"1"}
            p={"1em"}
            gap={"1"}
          >
            {isPlaying ? (
              <Stack align={"center"}>
                <Flex align={"center"} gap={"1"} flex={"1"} justify={"center"}>
                  <Heading size={"3xl"} color={"fg"}>
                    {String(secondsLeft / 60).padStart(2, "0")}
                  </Heading>
                  :
                  <Heading size={"3xl"} color={"fg"}>
                    {String(secondsLeft % 60).padStart(2, "0")}
                  </Heading>
                </Flex>
                <Flex align={"baseline"} gap={"1"}>
                  <Heading color={isPaused ? "orange.fg" : "green.fg"}>
                    {isWorking ? "Work" : "Break"}
                  </Heading>
                  {isPaused ? " paused" : ""}
                </Flex>
              </Stack>
            ) : (
              <>
                <Flex align={"center"} justify={"space-between"} gap={"1"}>
                  <IconButton
                    variant={"ghost"}
                    size={"2xs"}
                    rounded={"full"}
                    asChild
                    padding={"0.25em"}
                    disabled={workDuration <= config.workDuration.min}
                    onClick={() => setWorkDuration(workDuration - 1)}
                  >
                    <LuMinus />
                  </IconButton>
                  <Flex align={"baseline"} gap={"1"}>
                    <Heading color={"fg"} size={"3xl"}>
                      {workDuration}
                    </Heading>{" "}
                    {workDuration > 1 ? "mins" : "min"}
                  </Flex>
                  <IconButton
                    variant={"ghost"}
                    size={"2xs"}
                    rounded={"full"}
                    asChild
                    padding={"0.25em"}
                    disabled={workDuration >= config.workDuration.max}
                    onClick={() => setWorkDuration(workDuration + 1)}
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
                    disabled={breakDuration <= config.breakDuration.min}
                    onClick={() => setBreakDuration(breakDuration - 1)}
                  >
                    <LuMinus />
                  </IconButton>
                  <Flex align={"baseline"} gap={"1"}>
                    <Heading color={"fg"} size={"3xl"}>
                      {breakDuration}
                    </Heading>{" "}
                    {breakDuration > 1 ? "mins" : "min"}
                  </Flex>
                  <IconButton
                    variant={"ghost"}
                    size={"2xs"}
                    rounded={"full"}
                    asChild
                    padding={"0.25em"}
                    disabled={breakDuration >= config.breakDuration.max}
                    onClick={() => setBreakDuration(breakDuration + 1)}
                  >
                    <LuPlus />
                  </IconButton>
                </Flex>
              </>
            )}
          </Flex>
        </PomodoroTimerProgressCircle>
      </Flex>

      <Flex align={"center"} justify={"space-between"} gap={"1"}>
        <IconButton
          variant={"ghost"}
          color={"red.fg"}
          onClick={() => {
            setIsPaused(false);
            setIsPlaying(false);
          }}
          asChild
          padding={"0.25em"}
        >
          <LuRefreshCcw />
        </IconButton>

        <Flex align={"center"} justify={"space-between"} flex={"1"}>
          {isPlaying ? (
            <Flex align={"baseline"} gap={"1"} flex={"1"} justify={"center"}>
              Set
              <Heading color={"fg"}>
                {Math.floor(currentRep / 2) + (currentRep % 2 ? 1 : 0)}
              </Heading>
              /<Heading color={"fg"}>{sets}</Heading>
            </Flex>
          ) : (
            <>
              <IconButton
                variant={"ghost"}
                size={"2xs"}
                rounded={"full"}
                asChild
                padding={"0.25em"}
                disabled={sets <= config.sets.min}
                onClick={() => setSets(sets - 1)}
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
                disabled={sets >= config.sets.max}
                onClick={() => setSets(sets + 1)}
              >
                <LuPlus />
              </IconButton>
            </>
          )}
        </Flex>

        <IconButton
          variant={"ghost"}
          color={isPlaying && !isPaused ? "orange.fg" : "green.fg"}
          onClick={() =>
            isPlaying ? setIsPaused(!isPaused) : setIsPlaying(true)
          }
          asChild
          padding={"0.25em"}
        >
          {isPlaying && !isPaused ? (
            <LuPause fill={"currentcolor"} />
          ) : (
            <LuPlay fill={"currentcolor"} />
          )}
        </IconButton>
      </Flex>
    </Stack>
  );
};
