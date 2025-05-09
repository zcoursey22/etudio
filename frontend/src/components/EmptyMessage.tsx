import { Flex, Text } from "@chakra-ui/react";

interface Props {
  message?: string;
}

export const EmptyMessage = ({ message = "No items" }: Props) => {
  return (
    <Flex color={"fg.muted"} justify={"center"} align={"center"}>
      <Text>{message}</Text>
    </Flex>
  );
};
