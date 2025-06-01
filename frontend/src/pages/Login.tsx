import {
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Span,
} from "@chakra-ui/react";
import { useAuth } from "../hooks";
import { NavLink } from "../components/nav";
import { getSignupPath } from "../routes";
import { getTitle } from "../utils";

export const Login = () => {
  const { login } = useAuth();

  return (
    <>
      <title>{getTitle("Log in")}</title>
      <Flex as="form" direction={"column"} gap={"1.5em"} minW={"md"}>
        <Heading>Welcome back!</Heading>
        <Fieldset.Root>
          <Field.Root required>
            <Field.Label>
              Email address
              <Field.RequiredIndicator />
            </Field.Label>
            <Input name="email" type="email" autoFocus />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password
              <Field.RequiredIndicator />
            </Field.Label>
            <Input name="password" type="password" />
          </Field.Root>
        </Fieldset.Root>
        <Button onClick={login}>Log in</Button>
        <Span color={"fg.muted"}>
          Don't have an account? <NavLink to={getSignupPath()}>Sign up</NavLink>
        </Span>
      </Flex>
    </>
  );
};
