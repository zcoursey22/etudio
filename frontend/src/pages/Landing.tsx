import { Button, Group, Heading, Icon, Span, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { getLoginPath, getSignupPath } from "../routes";
import { LuLogIn } from "react-icons/lu";

export const Landing = () => {
  return (
    <Stack align={"center"} maxWidth={"xl"} gap={"1.5em"}>
      <Stack gap={"1.5em"}>
        <Heading size={"5xl"}>A catchy marketing statement goes here.</Heading>
        <Span color={"fg.muted"}>
          More marketing stuff goes here to explain why you need to use this
          app. Don't go too in-depth but try to hit the main features.
        </Span>
      </Stack>
      <Group>
        <Button asChild>
          <NavLink to={getSignupPath()}>Sign up</NavLink>
        </Button>
        <Button asChild variant={"surface"}>
          <NavLink to={getLoginPath()}>
            <Icon>
              <LuLogIn />
            </Icon>
            Log in
          </NavLink>
        </Button>
      </Group>
    </Stack>
  );
};
