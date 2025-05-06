import { Heading } from "@chakra-ui/react";
import { NavLink } from "../components/nav/NavLink";

export const NotFound = () => {
  return (
    <>
      <Heading>404</Heading>
      <Heading>Page not found</Heading>
      <NavLink to="/">Go home</NavLink>
    </>
  );
};
