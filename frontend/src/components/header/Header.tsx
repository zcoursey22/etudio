import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { DarkModeSwitcher } from "../DarkModeSwitcher";
import { LuSearch } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Flex
      as={"header"}
      align={"center"}
      justify={"space-between"}
      gap={"1em"}
      p={"1em"}
      pl={"0"}
      background={"bg"}
      position={"sticky"}
      top={"0"}
      zIndex={"sticky"}
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
