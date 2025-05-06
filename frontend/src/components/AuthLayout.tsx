import { Outlet } from "react-router-dom";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { Title } from "./Title";
import { Footer } from "./footer";

export const AuthLayout = () => {
  return (
    <Stack minH={"100vh"}>
      <Box p={"1em"} pb={"0"}>
        <Title />
      </Box>
      <Flex
        as={"main"}
        flex={"1"}
        p="1em"
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={"1em"}
      >
        <Outlet />
      </Flex>
      <Box p={"1em"}>
        <Footer />
      </Box>
    </Stack>
  );
};
