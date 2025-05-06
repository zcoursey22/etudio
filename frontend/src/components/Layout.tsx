import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Box, Flex } from "@chakra-ui/react";
import { Nav } from "./nav";

export const Layout = () => {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Header />
      <Flex flex={"1"} gap="1em">
        <Nav />
        <Box as={"main"} flex={"1"} p="1em" pl={"0"}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
