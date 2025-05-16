import { Flex, Heading, IconButton, Span, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LuMinus, LuPlay, LuPlus, LuSquare } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { useClampedLocalStorage } from "../../hooks";

enum Note {
  A = 0,
  Bb = 1,
  B = 2,
  C = 3,
  Db = 4,
  D = 5,
  Eb = 6,
  E = 7,
  F = 8,
  Gb = 9,
  G = 10,
  Ab = 11,
}

const config: { [key: string]: { min: number; initial: number; max: number } } =
  {
    hz: { min: 415, initial: 440, max: 444 },
    note: { min: Note.A, initial: Note.C, max: Note.C },
    octave: { min: 0, initial: 3, max: 8 },
    cents: { min: -100, initial: 0, max: 100 },
  };

export const Tuner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hz, setHz] = useClampedLocalStorage(
    "etudio_tuner_hz",
    config.hz.initial,
    config.hz.min,
    config.hz.max
  );
  const [note, _setNote] = useLocalStorage("etudio_tuner_note", Note.A);
  const [octave, _setOctave] = useClampedLocalStorage(
    "etudio_tuner_octave",
    config.octave.initial,
    config.octave.min,
    config.octave.max
  );
  const [cents, setCents] = useClampedLocalStorage(
    "etudio_tuner_cents",
    config.cents.initial,
    config.cents.min,
    config.cents.max
  );

  const setNote = (newNote: Note) => {
    if (newNote < note) {
      if (newNote < Note.A) {
        if (octave > config.octave.min) {
          newNote = Note.Ab;
          setOctave(octave - 1);
        } else {
          newNote = Note.A;
        }
      }
    } else if (newNote > note) {
      if (newNote > Note.Ab) {
        if (octave < config.octave.max) {
          newNote = Note.A;
          setOctave(octave + 1);
        } else {
          newNote = Note.Ab;
        }
      } else if (newNote > Note.C && octave === config.octave.max) {
        newNote = Note.C;
      }
    }
    _setNote(newNote);
  };

  const setOctave = (newOctave: number) => {
    if (newOctave === 8 && note > Note.C) {
      setNote(Note.C);
    }
    _setOctave(newOctave);
  };

  const frequency = useMemo(() => {
    const noteOffset = (octave - 4) * 12 + (note - Note.A);
    const centsFactor = Math.pow(2, cents / 1200);
    const freq = hz * Math.pow(2, noteOffset / 12) * centsFactor;
    return freq;
  }, [note, octave, hz, cents]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const start = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const osc = audioCtxRef.current.createOscillator();
    osc.type = "sine";
    osc.frequency.value = frequency;
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

  useEffect(() => {
    if (isPlaying) {
      oscRef.current?.frequency.setValueAtTime(
        frequency,
        audioCtxRef.current!.currentTime
      );
    }
  }, [frequency, isPlaying]);

  return (
    <Stack>
      <Stack gap={"1"}>
        <Flex align={"center"} justify={"space-between"}>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
            disabled={note <= config.note.min && octave <= config.octave.min}
            onClick={() => setNote(note - 1)}
          >
            <LuMinus />
          </IconButton>
          <Heading color={"fg"} size={"3xl"}>
            {Note[note]}
          </Heading>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
            disabled={note >= config.note.max && octave >= config.octave.max}
            onClick={() => setNote(note + 1)}
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
            disabled={octave <= config.octave.min}
            onClick={() => setOctave(octave - 1)}
          >
            <LuMinus />
          </IconButton>
          <Heading color={"fg"} size={"3xl"}>
            {octave}
          </Heading>
          <IconButton
            variant={"ghost"}
            size={"2xs"}
            rounded={"full"}
            asChild
            padding={"0.25em"}
            disabled={octave >= config.octave.max}
            onClick={() => setOctave(octave + 1)}
          >
            <LuPlus />
          </IconButton>
        </Flex>
      </Stack>

      <Flex align={"flex-end"} gap={"1"}>
        <Stack flex={"1"}>
          <Flex align={"center"} justify={"space-between"}>
            <IconButton
              variant={"ghost"}
              size={"2xs"}
              rounded={"full"}
              asChild
              padding={"0.25em"}
              disabled={hz <= config.hz.min}
              onClick={() => setHz(hz - 1)}
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
              disabled={hz >= config.hz.max}
              onClick={() => setHz(hz + 1)}
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
              disabled={cents <= config.cents.min}
              onClick={() => setCents(cents - 1)}
            >
              <LuMinus />
            </IconButton>
            <Span>
              <Span color={cents !== 0 ? "fg.warning" : "fg.muted"}>
                {cents < 0 ? "-" : "+"}
              </Span>
              <Heading
                display={"inline"}
                color={cents !== 0 ? "fg.warning" : "fg"}
              >
                {Math.abs(cents)}
              </Heading>{" "}
              c
            </Span>
            <IconButton
              variant={"ghost"}
              size={"2xs"}
              rounded={"full"}
              asChild
              padding={"0.25em"}
              disabled={cents >= config.cents.max}
              onClick={() => setCents(cents + 1)}
            >
              <LuPlus />
            </IconButton>
          </Flex>
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
