import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Box, Flex } from "@chakra-ui/react";
import { Nav } from "./nav";

export const Layout = () => {
  return (
    <Flex height={"100vh"} overflowY={"hidden"}>
      <Nav />
      <Box flex={"1"} overflowY={"auto"} scrollbarGutter={"stable"}>
        <Header />
        <Box as={"main"} pr={"1em"} pb={"1em"}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
