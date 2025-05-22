import { Heading } from "@chakra-ui/react";
import { getTitle } from "../utils";

export const Profile = () => {
  return (
    <>
      <title>{getTitle("Profile")}</title>
      <Heading>Profile</Heading>
    </>
  );
};
