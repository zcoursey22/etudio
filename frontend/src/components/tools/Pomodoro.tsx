import { Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import { useClampedLocalStorage } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { LuMinus, LuPause, LuPlay, LuPlus, LuSquare } from "react-icons/lu";
import { PomodoroTimerProgressCircle } from "./PomodoroTimerProgressCircle";
import applauseWav from "../../assets/audio/applause.wav";
import chimeWav from "../../assets/audio/chime.wav";
import alarmWav from "../../assets/audio/alarm.wav";

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    workDuration: { min: 2, initial: 25, max: 90 },
    breakDuration: { min: 1, initial: 5, max: 30 },
    sets: { min: 2, initial: 4, max: 12 },
  };

export const Pomodoro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  const allDoneSfx = useRef(new Audio(applauseWav));
  const workDoneSfx = useRef(new Audio(alarmWav));
  const breakDoneSfx = useRef(new Audio(chimeWav));

  const [currentRep, setCurrentRep] = useState(1); // [1, sets * 2]
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState<number | null>(null);

  const [tick, setTick] = useState(0);
  const tickIntervalTime = 100;

  const start = () => {
    breakDoneSfx.current.currentTime = 0;
    breakDoneSfx.current.play();
    setCurrentRep(1);
    setStartTime(Date.now());
    setEndTime(Date.now() + workDuration * 60000);
    setIsPlaying(true);
  };

  const pause = () => {
    setPauseStartTime(Date.now());
    setIsPaused(true);
  };

  const unpause = () => {
    if (pauseStartTime) {
      const pauseDuration = Date.now() - pauseStartTime;
      setEndTime((prev) => prev + pauseDuration);
      setPauseStartTime(null);
    }
    setIsPaused(false);
  };

  const stop = () => {
    setIsPaused(false);
    setPauseStartTime(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= endTime) {
        if (currentRep % 2) {
          workDoneSfx.current.currentTime = 0;
          workDoneSfx.current.play();
        } else {
          breakDoneSfx.current.currentTime = 0;
          breakDoneSfx.current.play();
        }
        if (currentRep === sets * 2 - 1) {
          allDoneSfx.current.currentTime = 0;
          allDoneSfx.current.play();
          stop();
        } else {
          const nextRep = currentRep + 1;
          setCurrentRep(nextRep);
          setStartTime(now);
          setEndTime(
            now + (nextRep % 2 ? workDuration : breakDuration) * 60000
          );
        }
      }
      setTick((t) => t + 1);
    }, tickIntervalTime);
    return () => clearInterval(interval);
  }, [
    breakDuration,
    currentRep,
    isPaused,
    isPlaying,
    sets,
    workDuration,
    startTime,
    endTime,
  ]);

  const isWorking = isPlaying && !!(currentRep % 2);
  const secondsLeft: number = Math.ceil((endTime - Date.now()) / 1000);

  return (
    <Stack>
      <Flex justify={"center"}>
        <PomodoroTimerProgressCircle
          percentFilled={
            isPlaying
              ? 1 -
                secondsLeft / ((isWorking ? workDuration : breakDuration) * 60)
              : 0
          }
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
                    {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}
                  </Heading>
                  :
                  <Heading size={"3xl"} color={"fg"}>
                    {String(secondsLeft % 60).padStart(2, "0")}
                  </Heading>
                </Flex>
                <Flex align={"flex-end"} gap={"1"}>
                  <Heading color={isPaused ? "orange.fg" : "green.fg"}>
                    {isWorking ? "Work" : "Relax"}
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
                  <Flex align={"flex-end"} gap={"1"}>
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
                  <Flex align={"flex-end"} gap={"1"}>
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
        <Flex align={"center"} justify={"space-between"} flex={"1"}>
          {isPlaying ? (
            <>
              <IconButton
                variant={"ghost"}
                color={"red.fg"}
                onClick={stop}
                asChild
                padding={"0.25em"}
              >
                <LuSquare fill={"currentcolor"} />
              </IconButton>
              <Flex align={"flex-end"} gap={"1"} flex={"1"} justify={"center"}>
                Set
                <Heading color={"fg"}>
                  {Math.floor(currentRep / 2) + (currentRep % 2 ? 1 : 0)}
                </Heading>
                /<Heading color={"fg"}>{sets}</Heading>
              </Flex>
            </>
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
              <Flex align={"flex-end"} gap={"1"}>
                <Heading color={"fg"}>{sets}</Heading>
                {sets > 1 ? "sets" : "set"}
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
          onClick={() => {
            if (isPlaying) {
              if (isPaused) {
                unpause();
              } else {
                pause();
              }
            } else {
              start();
            }
          }}
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
