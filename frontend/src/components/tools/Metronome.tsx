import { Flex, Heading, IconButton, Span, Stack, Text } from "@chakra-ui/react";
import metronomeHigh from "../../assets/audio/metronome-high.wav";
import metronomeLow from "../../assets/audio/metronome-low.wav";
import { useEffect, useRef, useState } from "react";
import { LuMinus, LuPlay, LuPlus, LuSquare } from "react-icons/lu";
import { useClampedLocalStorage } from "../../hooks";

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    bpm: { min: 30, initial: 100, max: 300 },
    beatsPerMeasure: { min: 1, initial: 4, max: 12 },
  };

export const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useClampedLocalStorage(
    "etudio_metronome_bpm",
    config.bpm.initial,
    config.bpm.min,
    config.bpm.max
  );
  const [beatsPerMeasure, setBeatsPerMeasure] = useClampedLocalStorage(
    "etudio_metronome_beatsPerMeasure",
    config.beatsPerMeasure.initial,
    config.beatsPerMeasure.min,
    config.beatsPerMeasure.max
  );
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

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"} gap={"1"}>
        <IconButton
          variant={"ghost"}
          size={"2xs"}
          rounded={"full"}
          asChild
          padding={"0.25em"}
          disabled={bpm <= config.bpm.min}
          onClick={() => setBpm(bpm - 1)}
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
          disabled={bpm >= config.bpm.max}
          onClick={() => setBpm(bpm + 1)}
        >
          <LuPlus />
        </IconButton>
      </Flex>

      <Flex align={"flex-end"} gap={"1"}>
        <Flex align={"center"} justify={"space-between"} gap={"1"} flex={"1"}>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
            disabled={beatsPerMeasure <= config.beatsPerMeasure.min}
            onClick={() => setBeatsPerMeasure(beatsPerMeasure - 1)}
          >
            <LuMinus />
          </IconButton>
          <Flex direction={"column"} align={"center"} gap={"0"} fontSize={"md"}>
            <Span
              color={"fg"}
              fontSize={"xl"}
              fontWeight={"semibold"}
              height={"5"}
            >
              {beatsPerMeasure}
            </Span>
            <Span>4</Span>
          </Flex>

          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            disabled={beatsPerMeasure >= config.beatsPerMeasure.max}
            asChild
            padding={"0.25em"}
            onClick={() => setBeatsPerMeasure(beatsPerMeasure + 1)}
          >
            <LuPlus />
          </IconButton>
        </Flex>
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
