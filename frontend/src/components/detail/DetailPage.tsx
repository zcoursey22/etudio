import { ReactNode } from "react";
import { Box, Flex, Group, Heading, Span, Stack, Text } from "@chakra-ui/react";
import { BackButton } from "./BackButton";
import { Resource } from "../../models";
import { Favorite } from "../resources/shared";
import { Outlet } from "react-router-dom";
import { SubresourceConfig } from "./Subresource";

interface Props<T extends Resource> {
  resource: T;
  title: string;
  subtitle?: ReactNode;
  rightOfTitle?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subresourceConfigs?: SubresourceConfig<any>[];
}

export const DetailPage = <T extends Resource>({
  resource,
  title,
  subtitle,
  rightOfTitle,
  subresourceConfigs,
}: Props<T>) => {
  return (
    <Stack color={"fg.muted"}>
      <Flex gap={"0.5em"}>
        <BackButton />
        <Box>
          <Group>
            <Favorite isFavorite={resource.isFavorite} />
            <Span>
              <Heading display="inline-block" color={"fg"}>
                {title}
              </Heading>
              {rightOfTitle && <Span fontSize={"xs"}>{rightOfTitle}</Span>}
            </Span>
          </Group>
          {subtitle && <Text fontSize={"sm"}>{subtitle}</Text>}
        </Box>
      </Flex>
      <Outlet context={{ configs: subresourceConfigs }} />
    </Stack>
  );
};
