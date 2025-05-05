import { Flex, Group, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import viteLogo from "../assets/vite.svg";

export const Title = () => {
  return (
    <Flex asChild align={"center"} justify={"space-between"}>
      <NavLink to="/">
        <Group>
          <img src={viteLogo} alt="Etudio logo" />
          <Heading
            size="3xl"
            fontFamily={"monospace"}
            textTransform={"uppercase"}
          >
            Etudio
          </Heading>
        </Group>
      </NavLink>
    </Flex>
  );
};
