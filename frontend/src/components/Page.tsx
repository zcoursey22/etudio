import { Heading, Stack } from "@chakra-ui/react";
import { getTitle } from "../utils";

interface Props {
  title: string;
}

export const Page = ({ title }: Props) => {
  return (
    <>
      <title>{getTitle(title)}</title>
      <Stack color={"fg.muted"}>
        <Heading color={"fg"}>{title}</Heading>
      </Stack>
    </>
  );
};
