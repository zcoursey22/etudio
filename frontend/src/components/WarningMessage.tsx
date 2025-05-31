import { Flex, Icon, Text } from "@chakra-ui/react";
import { LuCircleAlert } from "react-icons/lu";

interface Props {
  message: string;
}

export const WarningMessage = ({ message }: Props) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      color={"fg.warning"}
      gap={"0.5em"}
    >
      <Icon size="md">
        <LuCircleAlert />
      </Icon>
      <Text>{message}</Text>
    </Flex>
  );
};
