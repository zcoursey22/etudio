import { Flex, Group, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logoSvg from "../assets/images/logo.svg";

export const Title = () => {
  return (
    <Flex asChild align={"center"} justify={"space-between"}>
      <NavLink to="/">
        <Group>
          <img src={logoSvg} alt="Etudio logo" />
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
