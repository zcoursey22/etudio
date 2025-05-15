import {
  Flex,
  Group,
  Heading,
  IconButton,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import metronomeHigh from "../../assets/audio/metronome-high.wav";
import metronomeLow from "../../assets/audio/metronome-low.wav";
import { useEffect, useRef, useState } from "react";
import { LuMinus, LuPlay, LuPlus, LuSquare } from "react-icons/lu";
import useLocalStorage from "use-local-storage";

export const Metronome = () => {
  const [beatsPerMeasure, setBeatsPerMeasure] = useLocalStorage(
    "etudio_metronome_beatsPerMeasure",
    4
  );
  const [bpm, setBpm] = useLocalStorage("etudio_metronome_bpm", 100);
  const [isPlaying, setIsPlaying] = useState(false);
  const beatRef = useRef(1);
  const intervalRef = useRef<number>(undefined);

  const highClick = useRef(new Audio(metronomeHigh));
  highClick.current.volume = 1;
  const lowClick = useRef(new Audio(metronomeLow));
  lowClick.current.volume = 0.25;

  const start = () => {
    if (intervalRef.current) return;
    setIsPlaying(true);
  };

  const stop = () => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    beatRef.current = 1;
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    beatRef.current = 1;
    highClick.current.play();
    const interval = (60 / bpm) * 1000;
    intervalRef.current = setInterval(() => {
      const isDownbeat = beatRef.current % beatsPerMeasure === 0;
      if (isDownbeat) {
        highClick.current.currentTime = 0;
        highClick.current.play();
      } else {
        lowClick.current.currentTime = 0;
        lowClick.current.play();
      }
      beatRef.current += 1;
    }, interval);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [beatsPerMeasure, bpm, isPlaying]);

  const handleBpmChange = (val: number) => {
    if (val >= 30 && val <= 300 && val != bpm) {
      setBpm(val);
    }
  };

  const handleBeatsPerMeasureChange = (val: number) => {
    if (val >= 1 && val <= 12 && val != beatsPerMeasure) {
      setBeatsPerMeasure(val);
    }
  };

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"} gap={"1"}>
        <IconButton
          variant={"ghost"}
          size={"2xs"}
          rounded={"full"}
          asChild
          padding={"0.25em"}
          disabled={bpm <= 30}
          onClick={() => handleBpmChange(bpm - 1)}
        >
          <LuMinus />
        </IconButton>
        <Flex align={"baseline"} gap={"1"}>
          <Heading color={"fg"} size={"3xl"}>
            {bpm}
          </Heading>
          <Text>BPM</Text>
        </Flex>
        <IconButton
          variant={"ghost"}
          size={"2xs"}
          rounded={"full"}
          asChild
          padding={"0.25em"}
          disabled={bpm >= 300}
          onClick={() => handleBpmChange(bpm + 1)}
        >
          <LuPlus />
        </IconButton>
      </Flex>
      <Flex align={"center"} justify={"space-between"} gap={"1"}>
        <Group>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
            disabled={beatsPerMeasure <= 1}
            onClick={() => handleBeatsPerMeasureChange(beatsPerMeasure - 1)}
          >
            <LuMinus />
          </IconButton>
          <Stack gap={"0"} fontSize={"md"}>
            <Span
              color={"fg"}
              fontSize={"xl"}
              fontWeight={"semibold"}
              height={"5"}
            >
              {beatsPerMeasure}
            </Span>
            <Span>4</Span>
          </Stack>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            disabled={beatsPerMeasure >= 12}
            asChild
            padding={"0.25em"}
            onClick={() => handleBeatsPerMeasureChange(beatsPerMeasure + 1)}
          >
            <LuPlus />
          </IconButton>
        </Group>
        <IconButton
          variant={"ghost"}
          color={isPlaying ? "red.fg" : "green.fg"}
          onClick={isPlaying ? stop : start}
          asChild
          padding={"0.25em"}
        >
          {isPlaying ? (
            <LuSquare fill={"currentcolor"} />
          ) : (
            <LuPlay fill={"currentcolor"} />
          )}
        </IconButton>
      </Flex>
    </Stack>
  );
};
