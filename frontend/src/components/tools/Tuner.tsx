import {
  Flex,
  Group,
  Heading,
  IconButton,
  Span,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuMinus, LuPlay, LuPlus, LuSquare } from "react-icons/lu";
import useLocalStorage from "use-local-storage";

export const Tuner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hz, setHz] = useLocalStorage("etudio_tuner_hz", 440);
  const [note, setNote] = useLocalStorage("etudio_tuner_note", 0);
  const [cents, setCents] = useLocalStorage("etudio_tuner_cents", 0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const start = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    const osc = audioCtxRef.current.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 440;
    osc.connect(audioCtxRef.current.destination);
    osc.start();

    oscRef.current = osc;
    setIsPlaying(true);
  };

  const stop = () => {
    oscRef.current?.stop();
    oscRef.current?.disconnect();
    setIsPlaying(false);
  };

  return (
    <Stack>
      <Stack gap={"0"}>
        <Flex align={"center"} justify={"space-between"}>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
          >
            <LuMinus />
          </IconButton>
          <Heading color={"fg"} size={"3xl"}>
            {"C"}
          </Heading>
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

        <Flex align={"center"} justify={"space-between"}>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
          >
            <LuMinus />
          </IconButton>
          <Heading color={"fg"} size={"3xl"}>
            {"3"}
          </Heading>
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
      </Stack>

      <Flex align={"flex-end"} justify={"space-between"}>
        <Stack>
          <Group>
            <IconButton
              variant={"ghost"}
              size={"2xs"}
              rounded={"full"}
              asChild
              padding={"0.25em"}
            >
              <LuMinus />
            </IconButton>
            <Flex align={"baseline"} display={"inline-flex"} gap={"1"}>
              <Heading color={hz !== 440 ? "fg.warning" : "fg"}>{hz}</Heading>{" "}
              Hz
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
          </Group>
          <Group>
            <IconButton
              variant={"ghost"}
              size={"2xs"}
              rounded={"full"}
              asChild
              padding={"0.25em"}
            >
              <LuMinus />
            </IconButton>
            <Span>
              +
              <Heading
                display={"inline"}
                color={cents !== 0 ? "fg.warning" : "fg"}
              >
                {cents}
              </Heading>{" "}
              c
            </Span>
            <IconButton
              variant={"ghost"}
              size={"2xs"}
              rounded={"full"}
              asChild
              padding={"0.25em"}
            >
              <LuPlus />
            </IconButton>
          </Group>
        </Stack>
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
