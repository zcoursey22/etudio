import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Resource } from "../../models";
import { ReactElement, ReactNode } from "react";
import { getTitle } from "../../utils";
import { ListProps } from "./List";

interface Props<T> {
  title: string;
  subtitle?: ReactNode;
  description?: ReactNode;
  children: ReactElement<ListProps<T>>;
}

export const ListPage = <T extends Resource>({
  title,
  subtitle,
  description,
  children,
}: Props<T>) => {
  return (
    <>
      <title>{getTitle(title)}</title>
      <Stack color={"fg.muted"} fontSize={"md"}>
        <Stack gap={"0"}>
          <Heading color={"fg"} size={"3xl"}>
            {title}
          </Heading>
          {subtitle && <Text fontSize={"sm"}>{subtitle}</Text>}
        </Stack>
        {description && <Box>{description}</Box>}
        {children}
      </Stack>
    </>
  );
};
