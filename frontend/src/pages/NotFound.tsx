import { Flex, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "../components/nav";
import { BackButton } from "../components/detail";
import { getTitle } from "../utils";

export const NotFound = () => {
  return (
    <>
      <title>{getTitle("404")}</title>
      <Stack color={"fg.muted"}>
        <Flex gap={"0.5em"}>
          <BackButton />
          <Span>
            <Heading display="inline-block" color={"fg"}>
              404
            </Heading>
            <Text fontSize={"sm"}>page not found</Text>
          </Span>
        </Flex>
        <Text fontSize={"sm"}>
          <NavLink to="/">Go home</NavLink>
        </Text>
      </Stack>
    </>
  );
};
