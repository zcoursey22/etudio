import { Heading } from "@chakra-ui/react";
import { getTitle } from "../utils";

export const Home = () => {
  return (
    <>
      <title>{getTitle("Home")}</title>
      <Heading>Home</Heading>
    </>
  );
};
