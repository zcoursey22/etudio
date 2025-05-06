import {
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Span,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "../components/nav/NavLink";
import { getSignupPath } from "../routes";

export const Login = () => {
  const { login } = useAuth();

  return (
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
      <Span>
        Don't have an account? <NavLink to={getSignupPath()}>Sign up</NavLink>
      </Span>
    </Flex>
  );
};
