import { Flex, ProgressCircle, Text } from "@chakra-ui/react";

interface Props {
  message?: string;
}

export const LoadingMessage = ({ message = "Loading..." }: Props) => {
  return (
    <Flex justify={"center"} align={"center"} gap={"0.5em"}>
      <ProgressCircle.Root value={null} size={"sm"}>
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
      <Text>{message}</Text>
    </Flex>
  );
};
