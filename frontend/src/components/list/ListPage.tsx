import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Resource } from "../../models";
import { ReactNode } from "react";
import { getTitle } from "../../utils";

interface Props<T extends Resource> {
  resources: T[];
  title: string;
  subtitle?: ReactNode;
  description?: ReactNode;
  listContent?: ReactNode;
}

export const ListPage = <T extends Resource>({
  title,
  subtitle,
  description,
  listContent,
}: Props<T>) => {
  return (
    <>
      <title>{getTitle(title)}</title>
      <Stack color={"fg.muted"}>
        <Stack gap={"0"}>
          <Heading color={"fg"} size={"3xl"}>
            {title}
          </Heading>
          {subtitle && <Text fontSize={"sm"}>{subtitle}</Text>}
        </Stack>
        {description && <Box>{description}</Box>}
        {listContent && <Box>{listContent}</Box>}
      </Stack>
    </>
  );
};
