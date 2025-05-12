import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "../components/nav/NavLink";
import { BackButton } from "../components/detail";

export const NotFound = () => {
  return (
    <Stack color={"fg.muted"}>
      <Flex gap={"0.5em"}>
        <BackButton />
        <Box>
          <Heading color={"fg"}>404</Heading>
          <Text fontSize={"sm"}>error</Text>
        </Box>
      </Flex>
      <Text fontSize={"sm"}>
        Page not found. <NavLink to="/">Go home</NavLink>
      </Text>
    </Stack>
  );
};
