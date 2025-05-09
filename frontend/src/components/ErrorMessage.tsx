import { Flex, Icon, Text } from "@chakra-ui/react";
import { LuCircleAlert } from "react-icons/lu";

interface Props {
  error?: Error | string;
  fallbackMessage?: string;
}

export const ErrorMessage = ({
  error,
  fallbackMessage = "An error occurred",
}: Props) => {
  return (
    <Flex justify={"center"} align={"center"} color={"fg.error"} gap={"0.5em"}>
      <Icon size="md">
        <LuCircleAlert />
      </Icon>
      <Text>
        {error instanceof Error
          ? error.message || fallbackMessage
          : error || fallbackMessage}
      </Text>
    </Flex>
  );
};
