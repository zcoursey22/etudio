import { Box, useToken } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  value: number;
  isPlaying: boolean;
}

export const PomodoroTimerProgressCircle = ({
  value,
  isPlaying,
  children,
}: Props) => {
  const [resolvedColor] = useToken("colors", [
    isPlaying ? "green.fg" : "orange.fg",
  ]);
  const [resolvedTrackColor] = useToken("colors", ["gray.muted"]);

  // 64:3 -> 32:6 - ratio for keeping ideal stroke width
  const size = "160px";
  const strokeWidth = 1.2 * 2;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <Box position="relative" width={size} height={size}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={resolvedTrackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <Box
        position="absolute"
        inset={0}
        display="flex"
        alignItems="stretch"
        justifyContent="stretch"
      >
        {children}
      </Box>
    </Box>
  );
};
