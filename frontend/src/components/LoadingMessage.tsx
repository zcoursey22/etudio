import { Flex, Spinner, Text } from "@chakra-ui/react";

interface Props {
  message?: string;
}

export const LoadingMessage = ({ message = "Loading..." }: Props) => {
  return (
    <Flex justify={"center"} align={"center"} gap={"0.5em"} color={"fg.muted"}>
      <Spinner size={"md"} />
      <Text>{message}</Text>
    </Flex>
  );
};
