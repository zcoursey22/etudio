import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { DarkModeSwitcher } from "../DarkModeSwitcher";
import { LuSearch } from "react-icons/lu";
import { useAuth } from "../../hooks";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Flex
      as={"header"}
      align={"center"}
      justify={"space-between"}
      gap={"1em"}
      p={"1em"}
      background={"bg"}
      position={"sticky"}
      top={"0"}
      zIndex={"sticky"}
      ml={"-1em"}
      pl={"1em"}
    >
      {isAuthenticated && (
        <InputGroup flex={"1"} startElement={<LuSearch />}>
          <Input />
        </InputGroup>
      )}
      {isAuthenticated && <DarkModeSwitcher />}
    </Flex>
  );
};
