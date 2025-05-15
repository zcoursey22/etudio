import useLocalStorage from "use-local-storage";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

export function useClampedLocalStorage(
  key: string,
  defaultValue: number,
  min: number,
  max: number
) {
  const [value, setRawValue] = useLocalStorage<number>(
    key,
    clamp(defaultValue, min, max)
  );

  const setValue = (newValue: number) => {
    const clamped = clamp(newValue, min, max);
    setRawValue(clamped);
  };

  return [value, setValue] as const;
}
