import { Heading, Stack } from "@chakra-ui/react";

interface Props {
  title: string;
}

export const ListPage = ({ title }: Props) => {
  return <Stack>{title && <Heading>{title}</Heading>}</Stack>;
};
