import { Stack } from "@chakra-ui/react";
import { useClampedLocalStorage } from "../../hooks";
import useLocalStorage from "use-local-storage";

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    workDuration: { min: 5, initial: 25, max: 90 },
    breakDuration: { min: 1, initial: 5, max: 30 },
    sets: { min: 1, initial: 4, max: 12 },
  };

export const Pomodoro = () => {
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

  return <Stack>TODO</Stack>;
};
