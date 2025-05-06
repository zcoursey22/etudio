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
import { getLoginPath } from "../routes";

export const Signup = () => {
  const { login } = useAuth();

  return (
    <Flex as="form" direction={"column"} gap="1.5em" minW={"md"}>
      <Heading>Create an account</Heading>
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
        <Field.Root required>
          <Field.Label>
            Confirm password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input name="confirm-password" type="password" />
        </Field.Root>
      </Fieldset.Root>
      <Button onClick={login}>Sign up</Button>
      <Span>
        Already have an account? <NavLink to={getLoginPath()}>Log in</NavLink>
      </Span>
    </Flex>
  );
};
