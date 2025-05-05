import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { DarkModeSwitcher } from "../DarkModeSwitcher";
import { LuSearch } from "react-icons/lu";
import { Title } from "../Title";

export const Header = () => {
  return (
    <Flex
      as={"header"}
      align={"center"}
      justify={"space-between"}
      gap={"1em"}
      p="1em"
      pb="0"
    >
      <Flex minWidth={"11em"}>
        <Title />
      </Flex>
      <InputGroup flex={"1"} startElement={<LuSearch />}>
        <Input />
      </InputGroup>
      <DarkModeSwitcher />
    </Flex>
  );
};
