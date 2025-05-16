import { Box, useToken } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  percentFilled: number;
  isPlaying: boolean;
  isWorking: boolean;
  isPaused: boolean;
}

export const PomodoroTimerProgressCircle = ({
  percentFilled,
  isPlaying,
  isWorking,
  isPaused,
  children,
}: Props) => {
  const [resolvedColor] = useToken("colors", [
    isPaused ? "orange.fg" : "green.fg",
  ]);
  const [resolvedFillColor] = useToken("colors", [
    !isWorking ? (isPaused ? "red.subtle" : "teal.subtle") : "none",
  ]);
  const [resolvedTrackColor] = useToken("colors", ["gray.muted"]);

  // 64:3 -> 32:6 - ratio for keeping ideal stroke width
  const size = "160px";
  const strokeWidth = 1.2 * 2;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percentFilled * circumference;

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
          fill={isPlaying ? resolvedFillColor : "none"}
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
